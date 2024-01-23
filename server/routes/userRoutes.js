import express from "express";
const router = express.Router();
import { getAllUsers, createNewUser, updateUser, deleteUser } from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.route('/')
   .post(createNewUser)
   .get(verifyJWT, getAllUsers)
   .patch(verifyJWT, updateUser)
   .delete(verifyJWT, deleteUser)

export default router;