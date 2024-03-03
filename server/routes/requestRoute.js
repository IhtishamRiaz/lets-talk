import express from "express";
const router = express.Router();
import {
   getAllRequests,
   createRequest,
   acceptRequest,
   rejectRequest,
   cancelRequest,
} from "../controllers/requestController.js";

router.route("/").post(createRequest).get(getAllRequests);

router.route("/accept").patch(acceptRequest);

router.route("/reject").patch(rejectRequest);

router.route("/cancel").delete(cancelRequest);

export default router;
