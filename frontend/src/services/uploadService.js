import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const uploadService = {
    /**
     * Upload single image
     */
    uploadImage: async (file, onUploadProgress = null) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post(API_ENDPOINTS.UPLOAD.IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onUploadProgress) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onUploadProgress(percentCompleted);
                }
            },
        });

        return response.data;
    },

    /**
     * Upload multiple images
     */
    uploadImages: async (files, onUploadProgress = null) => {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('images', file);
        });

        const response = await api.post(API_ENDPOINTS.UPLOAD.IMAGES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onUploadProgress) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onUploadProgress(percentCompleted);
                }
            },
        });

        return response.data;
    },

    /**
     * Upload avatar
     */
    uploadAvatar: async (file, onUploadProgress = null) => {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await api.post(API_ENDPOINTS.UPLOAD.AVATAR, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onUploadProgress) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onUploadProgress(percentCompleted);
                }
            },
        });

        return response.data;
    },

    /**
     * Validate image file
     */
    validateImage: (file, maxSize = 5 * 1024 * 1024) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
        }

        if (file.size > maxSize) {
            throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`);
        }

        return true;
    },

    /**
     * Convert file to base64
     */
    fileToBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    },

    /**
     * Create image preview URL
     */
    createPreviewUrl: (file) => {
        return URL.createObjectURL(file);
    },

    /**
     * Revoke preview URL
     */
    revokePreviewUrl: (url) => {
        URL.revokeObjectURL(url);
    },
};

export default uploadService;
