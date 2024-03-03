import User from "../models/userModel.js";
import Request from "../models/requestModel.js";

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

      // const receiver = await User.findById(receiverId);

      // if (receiver.requests.includes(senderId)) {
      //    return res.status(400).json({ message: "Request Already Sent!" });
      // }

      // if (receiver.friends.includes(senderId)) {
      //    return res.status(400).json({ message: "Already Friends!" });
      // }

      // receiver.requests.push(senderId);
      // const newRequest = await receiver.save();
      const newRequest = await Request.create({
         sender: senderId,
         receiver: receiverId,
      });

      if (!newRequest) {
         return res.status(400).json({ message: "Request Failed!" });
      }

      res.status(201).json({ message: "Request Sent!" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// @desc Accept Incoming Request
// @route PATCH /request/accept
// @access Private
const acceptRequest = async (req, res) => {
   try {
      const { senderId } = req.body;
      const receiverId = req.userId;

      const existingRequest = await Request.findOne({
         sender: senderId,
         receiver: receiverId,
      });

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
      const { otherUserId } = req.body;
      const myUserId = req.userId;

      const myUser = await User.findById(myUserId);

      myUser.requests = myUser.requests.filter(
         (requestId) => requestId.toString() !== otherUserId.toString()
      );

      await myUser.save();

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

      res.status(201).json({ message: "Request Canceled!" });
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
