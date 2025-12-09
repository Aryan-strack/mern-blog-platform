import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const authService = {
    /**
     * Register new user
     */
    register: async (userData) => {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);

        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
        }

        return response.data;
    },

    /**
     * Login user
     */
    login: async (credentials) => {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
        }

        return response.data;
    },

    /**
     * Logout user
     */
    logout: async () => {
        try {
            await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            localStorage.removeItem('token');
        }
    },

    /**
     * Get current user
     */
    getCurrentUser: async () => {
        const response = await api.get(API_ENDPOINTS.AUTH.ME);
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (profileData) => {
        const response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, profileData);
        return response.data;
    },

    /**
     * Update user profile with avatar
     */
    updateProfileWithAvatar: async (formData) => {
        const response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Change password
     */
    changePassword: async (passwordData) => {
        const response = await api.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
        return response.data;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    /**
     * Get stored token
     */
    getToken: () => {
        return localStorage.getItem('token');
    },
};

export default authService;
