import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const commentService = {
    /**
     * Get comments for a post
     */
    getCommentsByPost: async (postId) => {
        const response = await api.get(API_ENDPOINTS.COMMENTS.BY_POST(postId));
        return response.data;
    },

    /**
     * Get single comment
     */
    getComment: async (commentId) => {
        const response = await api.get(API_ENDPOINTS.COMMENTS.BY_ID(commentId));
        return response.data;
    },

    /**
     * Get replies to a comment
     */
    getCommentReplies: async (commentId) => {
        const response = await api.get(API_ENDPOINTS.COMMENTS.REPLIES(commentId));
        return response.data;
    },

    /**
     * Create new comment
     */
    createComment: async (commentData) => {
        const response = await api.post(API_ENDPOINTS.COMMENTS.BASE, commentData);
        return response.data;
    },

    /**
     * Update comment
     */
    updateComment: async (commentId, commentData) => {
        const response = await api.put(API_ENDPOINTS.COMMENTS.BY_ID(commentId), commentData);
        return response.data;
    },

    /**
     * Delete comment
     */
    deleteComment: async (commentId) => {
        const response = await api.delete(API_ENDPOINTS.COMMENTS.BY_ID(commentId));
        return response.data;
    },

    /**
     * Like/Unlike comment
     */
    likeComment: async (commentId) => {
        const response = await api.post(API_ENDPOINTS.COMMENTS.LIKE(commentId));
        return response.data;
    },
};

export default commentService;
