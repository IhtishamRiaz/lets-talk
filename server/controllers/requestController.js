import User from "../models/userModel.js"

// @desc Create New Request
// @route POST /request
// @access Private
const createRequest = async (req, res) => {
   try {
      const { to } = req.body
      const from = req.userId

      const receipient = await User.findById(to);

      if (receipient.requests.includes(from)) {
         return res.status(400).json({ message: 'Request Already Sent!' })
      }

      if (receipient.friends.includes(from)) {
         return res.status(400).json({ message: 'Already Friends!' })
      }

      receipient.requests.push(from)
      const newRequest = await receipient.save();


      if (!newRequest) {
         return res.status(400).json({ message: 'Request Failed!' })
      }

      res.status(201).json({ message: 'Request Sent!' })
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
}

// @desc Accept Incoming Request
// @route PATCH /request/accept
// @access Private
const acceptRequest = async (req, res) => {
   try {
      const { otherUserId } = req.body;
      const myUserId = req.userId;

      const otherUser = await User.findById(otherUserId);
      const myUser = await User.findById(myUserId);

      if (!otherUser || !myUser) {
         return res.status(400).json({ message: 'User Not Found!' })
      }

      if (!myUser.requests.includes(otherUserId)) {
         return res.status(400).json({ message: 'Request Not Found!' })
      }

      myUser.friends.push(otherUserId)
      otherUser.friends.push(myUserId)


      myUser.requests = myUser.requests.filter(requestId => requestId.toString() !== otherUserId.toString());
      // If both users requested at the same time
      otherUser.requests = otherUser.requests.filter(requestId => requestId.toString() !== myUserId.toString());

      await myUser.save();
      await otherUser.save();

      res.status(201).json({ message: 'Request Accepted!' })

   } catch (error) {
      if (error.name === 'CastError') {
         return res.status(400).json({ message: 'Invalid user ID!' });
      }
      res.status(500).json({ message: error.message });
   }
}

// @desc Reject Incoming Request
// @route PATCH /request/reject
// @access Private
const rejectRequest = async (req, res) => {
   try {
      const { otherUserId } = req.body;
      const myUserId = req.userId;

      const myUser = await User.findById(myUserId);

      myUser.requests = myUser.requests.filter(requestId => requestId.toString() !== otherUserId.toString());

      await myUser.save();

      res.status(201).json({ message: 'Request Rejected!' })

   } catch (error) {
      if (error.name === 'CastError') {
         return res.status(400).json({ message: 'Invalid user ID!' });
      }
      res.status(500).json({ message: error.message });
   }
}

// @desc Cancel Outgoing Request
// @route PATCH /request/cancel
// @access Private
const cancelRequest = async (req, res) => {
   try {
      const { otherUserId } = req.body;
      const myUserId = req.userId;

      const otherUser = await User.findById(otherUserId);

      otherUser.requests = otherUser.requests.filter(requestId => requestId.toString() !== myUserId.toString());

      await otherUser.save();

      res.status(201).json({ message: 'Request Canceled!' })

   } catch (error) {
      if (error.name === 'CastError') {
         return res.status(400).json({ message: 'Invalid user ID!' });
      }
      res.status(500).json({ message: error.message });
   }
}

export { createRequest, acceptRequest, rejectRequest, cancelRequest }