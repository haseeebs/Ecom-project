import User from "../models/userModel.js";
import wrapAsync from "../utils/wrapAsync.js";
import { generateToken } from "../utils/generateToken.js";

// Auth user & Get token
// Route: POST /api/users/login
// Access Public
export const authUser = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404);
        throw new Error('User not found. Please check your email or register a new account.');
    }

    if (user && await user.matchPassword(password)) {

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)

        if (user) {
            throw new Error('Incorrect password')
        } else {
            throw new Error('Invalid Email or Password')
        }
    }
});

// Register User
// Route: POST /api/users
// Access Public
export const registerUser = wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email })

    if (existUser) {
        res.status(400)
        throw new Error('User already exists...')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data...")
    }
});

// Logout User / Clear Cookie
// Route: POST /api/users/logout
// Access Private
export const logoutUser = wrapAsync(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Logged out successfully' })
});

// Get User Profile
// Route: GET /api/users/profile
// Access Private
export const getUserProfile = wrapAsync(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found...')
    }
});

// Update User Profile
// Route: PUT /api/users/profile
// Access Private
export const updateUserProfile = wrapAsync(async (req, res) => {
    const user = await User.findById(req.user._id);

    const { username, email, password } = req.body;

    if (user) {
        user.username = username || user.username
        user.email = email || user.email
        if (password) {
            user.password = password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found...')
    }
});

// Get Users
// Route: GET api/users
// Access Private/Admin
export const getUsers = wrapAsync(async (req, res) => {
    res.send('Get users...')
});

// Get Users
// Route: GET api/users/:id
// Access Private/Admin
export const getUserById = wrapAsync(async (req, res) => {
    res.send('Get user by id...')
});

// Delete User
// Route: DELETE api/users/:id
// Access Private/Admin
export const deleteUser = wrapAsync(async (req, res) => {
    res.send('Delete user...')
});


// Update User
// Route: PUT api/users/:id
// Access Private/Admin
export const updateUser = wrapAsync(async (req, res) => {
    res.send('Update user...')
});
