import User from '../models/User.js';
import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    const filter = {};

    if (search) {
        filter.$or = [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
        .select('-password')
        .skip(skip)
        .limit(parseInt(limit))
        .sort('-createdAt');

    res.status(200).json(
        new ApiResponse('Users retrieved successfully', {
            users,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        })
    );
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    // Get user's posts count
    const postsCount = await Post.countDocuments({
        author: user._id,
        status: 'published'
    });

    res.status(200).json(
        new ApiResponse('User retrieved successfully', {
            user: {
                ...user.toObject(),
                postsCount
            }
        })
    );
});

// @desc    Get user by username
// @route   GET /api/users/username/:username
// @access  Public
export const getUserByUsername = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username })
        .select('-password');

    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    // Get user's posts
    const posts = await Post.find({
        author: user._id,
        status: 'published'
    })
        .select('title slug excerpt featuredImage createdAt viewCount likes')
        .sort('-createdAt')
        .limit(10);

    res.status(200).json(
        new ApiResponse('User retrieved successfully', {
            user,
            posts
        })
    );
});

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
    const { username, email, bio, role, isVerified } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    // Check if username/email already exists
    if (username && username !== user.username) {
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return next(new ApiError('Username already taken', 400));
        }
    }

    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return next(new ApiError('Email already in use', 400));
        }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, email, bio, role, isVerified },
        { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json(
        new ApiResponse('User updated successfully', { user: updatedUser })
    );
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
        return next(new ApiError('You cannot delete your own account', 400));
    }

    // Delete user's posts
    await Post.deleteMany({ author: user._id });

    await user.deleteOne();

    res.status(200).json(
        new ApiResponse('User deleted successfully', {})
    );
});

// @desc    Get user stats
// @route   GET /api/users/:id/stats
// @access  Public
export const getUserStats = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    const posts = await Post.find({ author: user._id, status: 'published' });

    const stats = {
        totalPosts: posts.length,
        totalViews: posts.reduce((acc, post) => acc + post.viewCount, 0),
        totalLikes: posts.reduce((acc, post) => acc + post.likes.length, 0),
        totalComments: posts.reduce((acc, post) => acc + post.commentsCount, 0),
    };

    res.status(200).json(
        new ApiResponse('User stats retrieved successfully', { stats })
    );
});

// @desc    Follow/Unfollow user
// @route   POST /api/users/:id/follow
// @access  Private
export const followUser = asyncHandler(async (req, res, next) => {
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
        return next(new ApiError('User not found', 404));
    }

    if (req.params.id === req.user.id) {
        return next(new ApiError('You cannot follow yourself', 400));
    }

    // Note: This requires adding followers/following fields to User model
    // For now, just return a success message

    res.status(200).json(
        new ApiResponse('Follow functionality requires User model update', {})
    );
});
