// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        UPDATE_PROFILE: '/auth/update-profile',
        CHANGE_PASSWORD: '/auth/change-password',
    },

    // Posts
    POSTS: {
        BASE: '/posts',
        FEATURED: '/posts/featured',
        BY_AUTHOR: (authorId) => `/posts/author/${authorId}`,
        BY_ID: (id) => `/posts/${id}`,
        LIKE: (id) => `/posts/${id}/like`,
    },

    // Comments
    COMMENTS: {
        BASE: '/comments',
        BY_POST: (postId) => `/comments/post/${postId}`,
        BY_ID: (id) => `/comments/${id}`,
        REPLIES: (id) => `/comments/${id}/replies`,
        LIKE: (id) => `/comments/${id}/like`,
    },

    // Users
    USERS: {
        BASE: '/users',
        BY_ID: (id) => `/users/${id}`,
        BY_USERNAME: (username) => `/users/username/${username}`,
        STATS: (id) => `/users/${id}/stats`,
        FOLLOW: (id) => `/users/${id}/follow`,
    },

    // Upload
    UPLOAD: {
        IMAGE: '/upload/image',
        IMAGES: '/upload/images',
        AVATAR: '/upload/avatar',
    },
};

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    POSTS: '/posts',
    POST_DETAIL: (slug) => `/posts/${slug}`,
    CREATE_POST: '/create-post',
    EDIT_POST: (id) => `/edit-post/${id}`,
    PROFILE: '/profile',
    USER_PROFILE: (username) => `/user/${username}`,
    DASHBOARD: '/dashboard',
    NOT_FOUND: '/404',
};

// Post Status
export const POST_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
};

// User Roles
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    POSTS_PER_PAGE: 12,
    COMMENTS_PER_PAGE: 20,
};

// Validation Rules
export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_]+$/,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 50,
    },
    POST: {
        TITLE_MIN: 5,
        TITLE_MAX: 200,
        CONTENT_MIN: 50,
        EXCERPT_MAX: 500,
    },
    COMMENT: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 1000,
    },
    BIO: {
        MAX_LENGTH: 500,
    },
};

// File Upload
export const UPLOAD_CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    MAX_IMAGES: 5,
};

// Toast Messages
export const TOAST_MESSAGES = {
    SUCCESS: {
        LOGIN: 'Login successful!',
        LOGOUT: 'Logged out successfully!',
        REGISTER: 'Registration successful!',
        POST_CREATED: 'Post created successfully!',
        POST_UPDATED: 'Post updated successfully!',
        POST_DELETED: 'Post deleted successfully!',
        COMMENT_ADDED: 'Comment added successfully!',
        COMMENT_UPDATED: 'Comment updated successfully!',
        COMMENT_DELETED: 'Comment deleted successfully!',
        PROFILE_UPDATED: 'Profile updated successfully!',
        PASSWORD_CHANGED: 'Password changed successfully!',
    },
    ERROR: {
        GENERIC: 'Something went wrong. Please try again.',
        LOGIN_FAILED: 'Invalid email or password.',
        NETWORK: 'Network error. Please check your connection.',
        UNAUTHORIZED: 'You are not authorized to perform this action.',
        NOT_FOUND: 'Resource not found.',
    },
};

// Categories (You can modify these based on your blog needs)
export const BLOG_CATEGORIES = [
    'Technology',
    'Programming',
    'Web Development',
    'Mobile Development',
    'Design',
    'Business',
    'Marketing',
    'Lifestyle',
    'Travel',
    'Food',
    'Health',
    'Finance',
    'Education',
    'Entertainment',
    'Sports',
    'Science',
    'Politics',
    'Other',
];

// Sort Options
export const SORT_OPTIONS = {
    LATEST: '-createdAt',
    OLDEST: 'createdAt',
    MOST_VIEWED: '-viewCount',
    MOST_LIKED: '-likes',
    TITLE_AZ: 'title',
    TITLE_ZA: '-title',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    RECENT_SEARCHES: 'recentSearches',
};

// Date Formats
export const DATE_FORMATS = {
    SHORT: 'MMM DD, YYYY',
    LONG: 'MMMM DD, YYYY',
    WITH_TIME: 'MMM DD, YYYY h:mm A',
    RELATIVE: 'relative',
};

// Debounce/Throttle Delays (in milliseconds)
export const DELAYS = {
    SEARCH: 500,
    AUTO_SAVE: 2000,
    SCROLL: 200,
};

export default {
    API_BASE_URL,
    API_ENDPOINTS,
    ROUTES,
    POST_STATUS,
    USER_ROLES,
    PAGINATION,
    VALIDATION_RULES,
    UPLOAD_CONFIG,
    TOAST_MESSAGES,
    BLOG_CATEGORIES,
    SORT_OPTIONS,
    STORAGE_KEYS,
    DATE_FORMATS,
    DELAYS,
};
