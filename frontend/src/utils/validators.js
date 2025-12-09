import { VALIDATION_RULES } from './constants';

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password
 */
export const isValidPassword = (password) => {
    if (!password) return false;
    const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.PASSWORD;
    return password.length >= MIN_LENGTH && password.length <= MAX_LENGTH;
};

/**
 * Validate username
 */
export const isValidUsername = (username) => {
    if (!username) return false;
    const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.USERNAME;

    if (username.length < MIN_LENGTH || username.length > MAX_LENGTH) {
        return false;
    }

    return PATTERN.test(username);
};

/**
 * Validate URL format
 */
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Validate post title
 */
export const isValidPostTitle = (title) => {
    if (!title) return false;
    const { TITLE_MIN, TITLE_MAX } = VALIDATION_RULES.POST;
    return title.trim().length >= TITLE_MIN && title.trim().length <= TITLE_MAX;
};

/**
 * Validate post content
 */
export const isValidPostContent = (content) => {
    if (!content) return false;
    const { CONTENT_MIN } = VALIDATION_RULES.POST;
    return content.trim().length >= CONTENT_MIN;
};

/**
 * Validate comment content
 */
export const isValidComment = (content) => {
    if (!content) return false;
    const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.COMMENT;
    const trimmed = content.trim();
    return trimmed.length >= MIN_LENGTH && trimmed.length <= MAX_LENGTH;
};

/**
 * Validate file type for images
 */
export const isValidImageType = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
};

/**
 * Validate file size
 */
export const isValidFileSize = (file, maxSize = 5 * 1024 * 1024) => {
    return file.size <= maxSize;
};

/**
 * Get password strength
 * Returns: 'weak', 'medium', 'strong'
 */
export const getPasswordStrength = (password) => {
    if (!password) return 'weak';

    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;

    // Contains numbers
    if (/\d/.test(password)) strength++;

    // Contains special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
};

/**
 * Validate form data
 */
export const validateForm = (formData, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const value = formData[field];
        const fieldRules = rules[field];

        // Required check
        if (fieldRules.required && (!value || value.trim() === '')) {
            errors[field] = fieldRules.message || `${field} is required`;
            return;
        }

        // Min length
        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
            errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
            return;
        }

        // Max length
        if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
            errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`;
            return;
        }

        // Pattern
        if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
            errors[field] = fieldRules.message || `${field} format is invalid`;
            return;
        }

        // Custom validation
        if (fieldRules.validate && value) {
            const customError = fieldRules.validate(value);
            if (customError) {
                errors[field] = customError;
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export default {
    isValidEmail,
    isValidPassword,
    isValidUsername,
    isValidURL,
    isValidPostTitle,
    isValidPostContent,
    isValidComment,
    isValidImageType,
    isValidFileSize,
    getPasswordStrength,
    validateForm,
};
