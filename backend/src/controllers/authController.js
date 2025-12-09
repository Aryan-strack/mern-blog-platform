import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/emailService.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  
  if (userExists) {
    throw new ApiError('User already exists', 400);
  }
  
  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });
  
  // Generate token
  const token = user.generateAuthToken();
  
  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  
  // Remove password from response
  const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
    createdAt: user.createdAt,
  };
  
  res.status(201).json(
    new ApiResponse('User registered successfully', {
      user: userResponse,
      token,
    })
  );
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }
  
  // Check password
  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    throw new ApiError('Invalid credentials', 401);
  }
  
  // Generate token
  const token = user.generateAuthToken();
  
  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  // Remove password from response
  const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
    createdAt: user.createdAt,
  };
  
  res.status(200).json(
    new ApiResponse('Login successful', {
      user: userResponse,
      token,
    })
  );
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  
  res.status(200).json(
    new ApiResponse('Logged out successfully')
  );
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json(
    new ApiResponse('User retrieved successfully', { user })
  );
});

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { username, email, bio } = req.body;
  
  // Check if username/email already exists
  if (username) {
    const usernameExists = await User.findOne({
      username,
      _id: { $ne: req.user.id },
    });
    
    if (usernameExists) {
      throw new ApiError('Username already taken', 400);
    }
  }
  
  if (email) {
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });
    
    if (emailExists) {
      throw new ApiError('Email already in use', 400);
    }
  }
  
  // Update user
  const updateData = { username, email, bio };
  
  if (req.file) {
    updateData.avatar = req.file.path;
  }
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    { new: true, runValidators: true }
  );
  
  res.status(200).json(
    new ApiResponse('Profile updated successfully', { user })
  );
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  
  const user = await User.findById(req.user.id).select('+password');
  
  // Check current password
  const isPasswordValid = await user.comparePassword(currentPassword);
  
  if (!isPasswordValid) {
    throw new ApiError('Current password is incorrect', 400);
  }
  
  // Update password
  user.password = newPassword;
  await user.save();
  
  res.status(200).json(
    new ApiResponse('Password changed successfully')
  );
});