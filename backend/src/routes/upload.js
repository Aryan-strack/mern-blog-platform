import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadSingle, uploadMultiple, handleUploadError } from '../middleware/upload.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private
router.post(
    '/image',
    uploadSingle('image'),
    handleUploadError,
    asyncHandler(async (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image',
            });
        }

        res.status(200).json(
            new ApiResponse('Image uploaded successfully', {
                url: req.file.path,
                filename: req.file.filename,
            })
        );
    })
);

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private
router.post(
    '/images',
    uploadMultiple('images', 5),
    handleUploadError,
    asyncHandler(async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image',
            });
        }

        const imageUrls = req.files.map((file) => ({
            url: file.path,
            filename: file.filename,
        }));

        res.status(200).json(
            new ApiResponse('Images uploaded successfully', {
                images: imageUrls,
                count: imageUrls.length,
            })
        );
    })
);

// @desc    Upload avatar
// @route   POST /api/upload/avatar
// @access  Private
router.post(
    '/avatar',
    uploadSingle('avatar'),
    handleUploadError,
    asyncHandler(async (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an avatar',
            });
        }

        res.status(200).json(
            new ApiResponse('Avatar uploaded successfully', {
                url: req.file.path,
                filename: req.file.filename,
            })
        );
    })
);

export default router;
