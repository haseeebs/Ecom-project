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
            name: user.name,
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
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email })

    if (existUser) {
        res.status(400)
        throw new Error('User already exists...')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
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
            name: user.name,
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

    const { name, email, password } = req.body;

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.password = password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
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
    const users = await User.find({});
    res.status(200).json(users);
});

// Get Users
// Route: GET api/users/:id
// Access Private/Admin
export const getUserById = wrapAsync(async (req, res) => {
    const user = await User.findById({ _id: req.params.id }).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User not found')
    }

    res.status(200).json(user);
});

// Delete User
// Route: DELETE api/users/:id
// Access Private/Admin
export const deleteUser = wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.isAdmin) {
        res.status(400);
        throw new Error('Cannot delete Admin user')
    }

    await User.findByIdAndDelete(user._id);
    res.status(200).json({ message: 'User deleted successfully' })
});


// Update User
// Route: PUT api/users/:id
// Access Private/Admin
export const updateUser = wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { name, email, isAdmin } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin !== 'undefined' ? Boolean(isAdmin) : user.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    });
});
