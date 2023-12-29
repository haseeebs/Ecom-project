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
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router();

// Get all users and register a new user
router.route('/').get(protect, admin, getUsers).post(registerUser);

// User login
router.post('/auth', authUser);

// User logout
router.post('/logout', logoutUser);

// Get user profile and update user profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Get user by ID, delete user, and update user
router.route('/:id')
  .get(protect, admin, getUserById) // Get user by ID
  .delete(protect, admin, deleteUser) // Delete user
  .put(protect, admin, updateUser); // Update user

export default router;
