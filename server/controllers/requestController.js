import User from "../models/userModel.js";
import Request from "../models/requestModel.js";
import { getUserSocketId, io } from "../services/sockets.js";

// @desc Get All Requests
// @route GET /request
// @access Private
const getAllRequests = async (req, res) => {
   try {
      const myUserId = req.userId;
      const allRequests = await Request.find({
         $or: [{ sender: myUserId }, { receiver: myUserId }],
      })
         .populate("sender", "name" + " username")
         .populate("receiver", "name" + " username")
         .exec();

      res.status(200).json(allRequests);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// @desc Create New Request
// @route POST /request
// @access Private
const createRequest = async (req, res) => {
   try {
      const { receiverId } = req.body;
      const senderId = req.userId;

      const existingRequest = await Request.find({
         sender: senderId,
         receiver: receiverId,
      });
      if (existingRequest.length > 0) {
         return res.status(400).json({ message: "Request Already Sent!" });
      }

      const newRequest = await Request.create({
         sender: senderId,
         receiver: receiverId,
      });

      if (!newRequest) {
         return res.status(400).json({ message: "Request Failed!" });
      }

      const populatedRequest = await Request.findById(newRequest._id)
         .populate("sender", "name" + " username")
         .populate("receiver", "name" + " username")
         .exec();

      // Emitting new Request if receiver is online
      const receiverSocketId = getUserSocketId(receiverId);
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("updateRequests", populatedRequest);
      }

      res.status(201).json({
         message: "Request Sent!",
         newRequest: populatedRequest,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// @desc Accept Incoming Request
// @route PATCH /request/accept
// @access Private
const acceptRequest = async (req, res) => {
   try {
      const { requestId } = req.body;

      if (!requestId) {
         return res.status(400).json({ message: "Request ID Not Found!" });
      }

      const existingRequest = await Request.findById(requestId);

      const senderId = existingRequest.sender;
      const receiverId = existingRequest.receiver;

      if (!existingRequest) {
         return res.status(400).json({ message: "Request Not Found!" });
      }

      const sender = await User.findById(senderId);
      const receiver = await User.findById(receiverId);

      if (!sender || !receiver) {
         return res.status(400).json({ message: "User Not Found!" });
      }

      receiver.friends.push(senderId);
      sender.friends.push(receiverId);

      await receiver.save();
      await sender.save();

      await Request.findByIdAndDelete(existingRequest._id);

      // Emitting Request update signal if receiver is online
      const receiverSocketId = getUserSocketId(receiverId.toString());
      console.log(receiverSocketId);
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("updateRequests", existingRequest._id);
         io.to(receiverSocketId).emit("updateUsers");
         console.log("Signal Sent");
      }
      // const senderSocketId = getUserSocketId(senderId);
      // if (senderSocketId) {
      //    io.to(senderSocketId).emit("updateCurrentUser");
      //    console.log("Signal Sent to Sender");
      // }

      res.status(201).json({ message: "Request Accepted!" });
   } catch (error) {
      if (error.name === "CastError") {
         return res.status(400).json({ message: "Invalid user ID!" });
      }
      res.status(500).json({ message: error.message });
   }
};

// @desc Reject Incoming Request
// @route PATCH /request/reject
// @access Private
const rejectRequest = async (req, res) => {
   try {
      const { requestId } = req.body;

      if (!requestId) {
         return res.status(400).json({ message: "Request ID Not Found!" });
      }

      const existingRequest = await Request.findById(requestId);

      if (!existingRequest) {
         return res.status(400).json({ message: "Request Not Found!" });
      }

      await Request.findByIdAndDelete(existingRequest._id);

      // Emitting Request update signal if receiver is online
      const receiverSocketId = getUserSocketId(
         existingRequest.receiver.toString()
      );
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("updateRequests", existingRequest._id);
         console.log("Signal Sent");
      }

      res.status(201).json({ message: "Request Rejected!" });
   } catch (error) {
      if (error.name === "CastError") {
         return res.status(400).json({ message: "Invalid user ID!" });
      }
      res.status(500).json({ message: error.message });
   }
};

// @desc Cancel Outgoing Request
// @route DELETE /request/cancel
// @access Private
const cancelRequest = async (req, res) => {
   try {
      const senderId = req.userId;

      const request = await Request.findOne({
         $or: [{ sender: senderId }, { receiver: senderId }],
      });

      await Request.findByIdAndDelete(request._id);

      // Emitting Request update signal if receiver is online
      const receiverSocketId = getUserSocketId(request.receiver.toString());
      if (receiverSocketId) {
         io.to(receiverSocketId).emit("updateRequests", request._id);
         console.log("Signal Sent");
      }

      res.status(201).json({
         message: "Request Canceled!",
         deletedRequestId: request._id,
      });
   } catch (error) {
      if (error.name === "CastError") {
         return res.status(400).json({ message: "Invalid user ID!" });
      }
      res.status(500).json({ message: error.message });
   }
};

export {
   getAllRequests,
   createRequest,
   acceptRequest,
   rejectRequest,
   cancelRequest,
};
