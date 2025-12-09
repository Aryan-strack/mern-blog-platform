import express from 'express';
import {
    getCommentsByPost,
    getComment,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    getCommentReplies,
} from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/post/:postId').get(getCommentsByPost);
router.route('/:id').get(getComment);
router.route('/:id/replies').get(getCommentReplies);

// Protected routes
router.use(protect);

router.route('/').post(createComment);
router.route('/:id').put(updateComment);
router.route('/:id').delete(deleteComment);
router.route('/:id/like').post(likeComment);

export default router;
