import { validationResult } from 'express-validator';

// Validation middleware to check for errors
export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errorMessages,
        });
    }

    next();
};

// Common validation chains
import { body, param, query } from 'express-validator';

// Auth validations
export const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

export const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

// Post validations
export const createPostValidation = [
    body('title')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    body('content')
        .trim()
        .isLength({ min: 50 })
        .withMessage('Content must be at least 50 characters'),
    body('excerpt')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Excerpt cannot exceed 500 characters'),
];

export const updatePostValidation = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    body('content')
        .optional()
        .trim()
        .isLength({ min: 50 })
        .withMessage('Content must be at least 50 characters'),
];

// Comment validations
export const createCommentValidation = [
    body('content')
        .trim()
        .isLength({ min: 2, max: 1000 })
        .withMessage('Comment must be between 2 and 1000 characters'),
    body('postId')
        .notEmpty()
        .withMessage('Post ID is required')
        .isMongoId()
        .withMessage('Invalid post ID'),
    body('parentCommentId')
        .optional()
        .isMongoId()
        .withMessage('Invalid parent comment ID'),
];

// ID validation
export const mongoIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
];

export default validate;
