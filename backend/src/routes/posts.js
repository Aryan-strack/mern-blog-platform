import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsByAuthor,
  getFeaturedPosts,
} from '../controllers/postController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.route('/').get(getPosts);
router.route('/featured').get(getFeaturedPosts);
router.route('/author/:authorId').get(getPostsByAuthor);
router.route('/:id').get(getPost);

// Protected routes
router.use(protect);

router.route('/').post(
  uploadSingle('featuredImage'),
  handleUploadError,
  createPost
);

router.route('/:id').put(
  uploadSingle('featuredImage'),
  handleUploadError,
  updatePost
);

router.route('/:id').delete(deletePost);
router.route('/:id/like').post(likePost);

export default router;