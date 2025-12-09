import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
export const getCommentsByPost = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({
        post: req.params.postId,
        parentComment: null // Only get top-level comments
    })
        .populate('author', 'username avatar')
        .populate({
            path: 'replies',
            populate: {
                path: 'author',
                select: 'username avatar'
            }
        })
        .sort('-createdAt');

    res.status(200).json(
        new ApiResponse('Comments retrieved successfully', { comments })
    );
});

// @desc    Get single comment
// @route   GET /api/comments/:id
// @access  Public
export const getComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id)
        .populate('author', 'username avatar')
        .populate('post', 'title');

    if (!comment) {
        return next(new ApiError('Comment not found', 404));
    }

    res.status(200).json(
        new ApiResponse('Comment retrieved successfully', { comment })
    );
});

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
export const createComment = asyncHandler(async (req, res, next) => {
    const { content, postId, parentCommentId } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
        return next(new ApiError('Post not found', 404));
    }

    // If it's a reply, check if parent comment exists
    if (parentCommentId) {
        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
            return next(new ApiError('Parent comment not found', 404));
        }
    }

    // Create comment
    const comment = await Comment.create({
        content,
        post: postId,
        author: req.user.id,
        parentComment: parentCommentId || null,
    });

    // Populate author info
    await comment.populate('author', 'username avatar');

    res.status(201).json(
        new ApiResponse('Comment created successfully', { comment })
    );
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ApiError('Comment not found', 404));
    }

    // Check ownership
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ApiError('Not authorized to update this comment', 403));
    }

    const { content } = req.body;

    comment.content = content;
    comment.isEdited = true;
    await comment.save();

    await comment.populate('author', 'username avatar');

    res.status(200).json(
        new ApiResponse('Comment updated successfully', { comment })
    );
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ApiError('Comment not found', 404));
    }

    // Check ownership
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ApiError('Not authorized to delete this comment', 403));
    }

    // Delete all child comments (replies) if any
    await Comment.deleteMany({ parentComment: comment._id });

    await comment.deleteOne();

    res.status(200).json(
        new ApiResponse('Comment deleted successfully', {})
    );
});

// @desc    Like/Unlike comment
// @route   POST /api/comments/:id/like
// @access  Private
export const likeComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ApiError('Comment not found', 404));
    }

    const userId = req.user.id;
    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
        // Unlike
        comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
        // Like
        comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json(
        new ApiResponse(
            hasLiked ? 'Comment unliked successfully' : 'Comment liked successfully',
            { likes: comment.likes.length, isLiked: !hasLiked }
        )
    );
});

// @desc    Get replies to a comment
// @route   GET /api/comments/:id/replies
// @access  Public
export const getCommentReplies = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ApiError('Comment not found', 404));
    }

    const replies = await Comment.find({ parentComment: req.params.id })
        .populate('author', 'username avatar')
        .sort('createdAt');

    res.status(200).json(
        new ApiResponse('Replies retrieved successfully', { replies })
    );
});
