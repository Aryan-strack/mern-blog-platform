import express from 'express';
import {
    getUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
    getUserStats,
    followUser,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/').get(getUsers);
router.route('/:id').get(getUserById);
router.route('/username/:username').get(getUserByUsername);
router.route('/:id/stats').get(getUserStats);

// Protected routes
router.use(protect);

router.route('/:id/follow').post(followUser);

// Admin only routes
router.route('/:id').put(authorize('admin'), updateUser);
router.route('/:id').delete(authorize('admin'), deleteUser);

export default router;
