import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { validateRegister, validateUserUpdate } from '../validations/userValidator.js';

// @desc Get All Users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(400).json({ message: 'No User Found!' });
    }
    res.json(users);
});

// @desc Create New User
// @route POST /users
// @access Public
const createNewUser = asyncHandler(async (req, res) => {
    // Validating Data
    const { error } = validateRegister(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    };

    const { name, email, password } = req.body;

    // Checkting for existing users
    const existingUser = await User.findOne({ email }).lean().exec();
    if (existingUser) {
        return res.status(409).json({ message: 'User With This Email Already Exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = {
        name: name,
        email: email,
        password: hashedPassword
    };

    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: `New User ${user?.name} Created!` });
    } else {
        res.status(400).json({ message: 'Failed to Register User!' });
    }
});

// @desc Update a User
// @route PATCH /users
// @access Private:Admin
const updateUser = asyncHandler(async (req, res) => {
    // Validate Data
    const { error } = validateUserUpdate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    };

    const { id, email, name, password, role } = req.body;

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User Not Found!' })
    }

    // Checkting for existing users with same email
    const existingUser = await User.findOne({ email }).lean().exec();
    // Don't allow email updates if email already is use
    if (existingUser && existingUser?._id.toString() !== id) {
        return res.status(409).json({ message: 'User With this Email Already Exists!' });
    }

    // Updating Fields
    user.name = name;
    user.email = email;
    user.role = role;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(201).json({ message: 'User Updated Successfully!' });
});

// @desc Delete a User
// @route DELETE /users
// @access Private:Admin
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User Not Found!' })
    }

    const result = await user.deleteOne();
    const reply = `User ${result.name} Deleted!`;

    res.status(200).json({ message: reply });
});

export { getAllUsers, createNewUser, updateUser, deleteUser };