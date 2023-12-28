import User from "../models/userModel.js";
import wrapAsync from "../utils/wrapAsync.js";

// Auth user & Get token
// Route: POST /api/users/login
// Access Public
export const authUser = wrapAsync(async (req, res) => {
    res.send('Auth user...')
});

// Register User
// Route: POST /api/users
// Access Public
export const registerUser = wrapAsync(async (req, res) => {
    res.send('Register user...')
});

// Logout User / Clear Cookie
// Route: POST /api/users/logout
// Access Private
export const logoutUser = wrapAsync(async (req, res) => {
    res.send('Logout user...')
});

// Get User Profile
// Route: GET /api/users/profile
// Access Private
export const getUserProfile = wrapAsync(async (req, res) => {
    res.send('Get User Profile...')
});

// Update User Profile
// Route: PUT /api/users/profile
// Access Private
export const updateUserProfile = wrapAsync(async (req, res) => {
    res.send('Update User Profile...')
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
