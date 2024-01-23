import express from "express";
import loginLimiter from '../middleware/loginLimiter.js';
import { login, refresh, logout } from '../controllers/authControllers.js';

const router = express.Router();


router.route('/')
    .post(loginLimiter, login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .get(logout)

export default router;