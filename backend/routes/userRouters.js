import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
} from '../controllers/userController.js';

const router = express.Router();

// Get all users and register a new user
router.route('/').get(getUsers).post(registerUser);

// User login
router.post('/login', authUser);

// User logout
router.post('/logout', logoutUser);

// Get user profile and update user profile
router.route('/profile').get(getUserProfile).put(updateUserProfile);

// Get user by ID, delete user, and update user
router.route('/:id')
  .get(getUserById) // Get user by ID
  .delete(deleteUser) // Delete user
  .put(updateUser); // Update user

export default router;
