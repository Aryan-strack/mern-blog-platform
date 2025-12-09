import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    search = '',
    category,
    tag,
    author,
    status = 'published',
  } = req.query;
  
  // Build filter
  const filter = { status };
  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }
  
  if (category) {
    filter.categories = category;
  }
  
  if (tag) {
    filter.tags = tag;
  }
  
  if (author) {
    filter.author = author;
  }
  
  // Pagination
  const posts = await Post.paginate(filter, {
    page: parseInt(page),
    limit: parseInt(limit),
    sort,
  });
  
  res.status(200).json(
    new ApiResponse('Posts retrieved successfully', posts)
  );
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username avatar bio')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username avatar',
      },
    });
    
  if (!post) {
    return next(new ApiError('Post not found', 404));
  }
  
  // Increment view count (only if user is not the author)
  if (!req.user || req.user.id !== post.author._id.toString()) {
    post.viewCount += 1;
    await post.save();
  }
  
  res.status(200).json(
    new ApiResponse('Post retrieved successfully', { post })
  );
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content, excerpt, categories, tags, status } = req.body;
  
  // Create post
  const post = await Post.create({
    title,
    content,
    excerpt,
    categories: categories ? categories.split(',').map(cat => cat.trim()) : [],
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    status: status || 'draft',
    author: req.user.id,
    featuredImage: req.file ? req.file.path : undefined,
  });
  
  // Populate author info
  await post.populate('author', 'username avatar');
  
  res.status(201).json(
    new ApiResponse('Post created successfully', { post })
  );
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  
  if (!post) {
    return next(new ApiError('Post not found', 404));
  }
  
  // Check ownership
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ApiError('Not authorized to update this post', 403));
  }
  
  const updateData = { ...req.body };
  
  // Handle categories and tags
  if (req.body.categories) {
    updateData.categories = req.body.categories.split(',').map(cat => cat.trim());
  }
  
  if (req.body.tags) {
    updateData.tags = req.body.tags.split(',').map(tag => tag.trim());
  }
  
  // Handle featured image
  if (req.file) {
    updateData.featuredImage = req.file.path;
  }
  
  // Update post
  post = await Post.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  ).populate('author', 'username avatar');
  
  res.status(200).json(
    new ApiResponse('Post updated successfully', { post })
  );
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return next(new ApiError('Post not found', 404));
  }
  
  // Check ownership
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ApiError('Not authorized to delete this post', 403));
  }
  
  await post.deleteOne();
  
  res.status(200).json(
    new ApiResponse('Post deleted successfully', {})
  );
});

// @desc    Like/Unlike post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return next(new ApiError('Post not found', 404));
  }
  
  const userId = req.user.id;
  const hasLiked = post.likes.includes(userId);
  
  if (hasLiked) {
    // Unlike
    post.likes = post.likes.filter(id => id.toString() !== userId);
  } else {
    // Like
    post.likes.push(userId);
  }
  
  await post.save();
  
  res.status(200).json(
    new ApiResponse(
      hasLiked ? 'Post unliked successfully' : 'Post liked successfully',
      { likes: post.likes.length, isLiked: !hasLiked }
    )
  );
});

// @desc    Get posts by author
// @route   GET /api/posts/author/:authorId
// @access  Public
export const getPostsByAuthor = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ 
    author: req.params.authorId,
    status: 'published'
  })
    .sort('-createdAt')
    .populate('author', 'username avatar');
    
  res.status(200).json(
    new ApiResponse('Posts retrieved successfully', { posts })
  );
});

// @desc    Get featured posts
// @route   GET /api/posts/featured
// @access  Public
export const getFeaturedPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ 
    isFeatured: true,
    status: 'published'
  })
    .sort('-createdAt')
    .limit(5)
    .populate('author', 'username avatar');
    
  res.status(200).json(
    new ApiResponse('Featured posts retrieved successfully', { posts })
  );
});