// src/services/postService.js
import api from './api';

const postService = {
  // Get all posts with pagination and filters
  getPosts: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return await api.get(`/posts?${queryParams}`);
  },
  
  // Get single post
  getPost: async (id) => {
    return await api.get(`/posts/${id}`);
  },
  
  // Create post
  createPost: async (postData) => {
    const formData = new FormData();
    
    // Append all fields
    Object.keys(postData).forEach(key => {
      if (key === 'featuredImage' && postData[key] instanceof File) {
        formData.append(key, postData[key]);
      } else if (Array.isArray(postData[key])) {
        formData.append(key, postData[key].join(','));
      } else if (postData[key] !== null && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });
    
    return await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Update post
  updatePost: async (id, postData) => {
    const formData = new FormData();
    
    Object.keys(postData).forEach(key => {
      if (key === 'featuredImage' && postData[key] instanceof File) {
        formData.append(key, postData[key]);
      } else if (Array.isArray(postData[key])) {
        formData.append(key, postData[key].join(','));
      } else if (postData[key] !== null && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });
    
    return await api.put(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Delete post
  deletePost: async (id) => {
    return await api.delete(`/posts/${id}`);
  },
  
  // Like/Unlike post
  likePost: async (id) => {
    return await api.post(`/posts/${id}/like`);
  },
  
  // Get featured posts
  getFeaturedPosts: async () => {
    return await api.get('/posts/featured');
  },
  
  // Get posts by author
  getPostsByAuthor: async (authorId) => {
    return await api.get(`/posts/author/${authorId}`);
  },
};

export default postService;