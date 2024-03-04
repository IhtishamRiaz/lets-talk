import express from "express";
const router = express.Router();
import {
   getAllUsers,
   createNewUser,
   updateUser,
   deleteUser,
   unfriendUser,
} from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";

router
   .route("/")
   .post(createNewUser)
   .get(verifyJWT, getAllUsers)
   .patch(verifyJWT, updateUser)
   .delete(verifyJWT, deleteUser);

router.route("/unfriend").patch(verifyJWT, unfriendUser);

export default router;
