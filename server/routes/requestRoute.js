import express from "express";
const router = express.Router();
import { createRequest, acceptRequest, rejectRequest, cancelRequest } from "../controllers/requestController.js";

router.route('/')
   .post(createRequest)

router.route('/accept')
   .patch(acceptRequest)

router.route('/reject')
   .patch(rejectRequest)

router.route('/cancel')
   .patch(cancelRequest)

export default router;