import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validateLogin from '../validations/loginValidator.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {

    // Validating incoming data
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Checking for credentials
    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials!' });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        return res.status(401).json({ message: 'Invalid Credentials!' });
    }

    // Creating Access Token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userId": user._id,
                "role": user.role
            }
        },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: '15m' }
    )

    // Creating Refresh Token
    const refreshToken = jwt.sign(
        {
            "userId": user._id
        },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: '7d' }
    )

    // Creating secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match refresh token i.e.'7d'
    })

    // Send accessToken
    res.json({ message: 'Logged in Successfully!', userId: user._id, role: user.role, accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const refreshToken = cookies.jwt;

    // Verify Refresh Token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const foundUser = await User.findById(decoded.userId).exec();

            if (!foundUser) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userId": foundUser._id,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: '15m' }
            );

            res.json({ role: foundUser.role, userId: foundUser._id, accessToken });
        })
    );
};

// @desc Logout
// @route GET /auth/logout
// @access Public - just to clear cookie if exists
const logout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        // return res.sendStatus(204)
        return res.status(201).json({ message: 'no cookie was found' });
    }

    res.clearCookie('jwt',
        {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
    );

    res.json({ message: 'Cookie cleared' });
};

export { login, refresh, logout };