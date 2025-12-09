/**
 * Format date to readable string
 */
export const formatDate = (date, format = 'short') => {
    if (!date) return '';

    const d = new Date(date);

    if (isNaN(d.getTime())) return '';

    const options = {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        withTime: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        },
    };

    if (format === 'relative') {
        return getRelativeTime(d);
    }

    return d.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Get relative time (e.g., "2 hours ago", "just now")
 */
export const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format number to compact form (e.g., 1.2K, 3.4M)
 */
export const formatCompactNumber = (num) => {
    if (num === null || num === undefined) return '0';

    const absNum = Math.abs(num);

    if (absNum >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (absNum >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Strip HTML tags from text
 */
export const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

/**
 * Calculate reading time (words per minute)
 */
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
};

/**
 * Format reading time to human readable
 */
export const formatReadingTime = (minutes) => {
    if (minutes < 1) return 'Less than a minute';
    if (minutes === 1) return '1 minute read';
    return `${minutes} min read`;
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str) => {
    if (!str) return '';
    return str.split(' ').map(capitalize).join(' ');
};

/**
 * Convert string to slug (URL-friendly)
 */
export const slugify = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Format file size to human readable
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Pluralize word based on count
 */
export const pluralize = (count, singular, plural = null) => {
    if (count === 1) return singular;
    return plural || singular + 's';
};

/**
 * Format count with pluralization (e.g., "5 comments", "1 comment")
 */
export const formatCount = (count, singular, plural = null) => {
    return `${formatNumber(count)} ${pluralize(count, singular, plural)}`;
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
};

export default {
    formatDate,
    getRelativeTime,
    formatNumber,
    formatCompactNumber,
    truncateText,
    stripHtml,
    calculateReadingTime,
    formatReadingTime,
    capitalize,
    capitalizeWords,
    slugify,
    formatFileSize,
    pluralize,
    formatCount,
    getInitials,
    formatPercentage,
};
