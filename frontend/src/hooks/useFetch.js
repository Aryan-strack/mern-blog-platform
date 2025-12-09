import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with loading and error states
 * @param {Function} fetchFn - Async function to fetch data
 * @param {Array} dependencies - Dependencies array (like useEffect)
 * @param {Object} options - Additional options
 */
const useFetch = (fetchFn, dependencies = [], options = {}) => {
    const {
        initialData = null,
        onSuccess = null,
        onError = null,
        skip = false, // Skip initial fetch
    } = options;

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState(null);

    const executeFetch = useCallback(async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchFn(...args);
            setData(result);

            if (onSuccess) {
                onSuccess(result);
            }

            return { data: result, error: null };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);

            if (onError) {
                onError(err);
            }

            return { data: null, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [fetchFn, onSuccess, onError]);

    // Refetch function to manually trigger fetch
    const refetch = useCallback((...args) => {
        return executeFetch(...args);
    }, [executeFetch]);

    // Reset function to clear state
    const reset = useCallback(() => {
        setData(initialData);
        setError(null);
        setLoading(false);
    }, [initialData]);

    // Auto-fetch on mount and when dependencies change
    useEffect(() => {
        if (!skip) {
            executeFetch();
        }
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        data,
        loading,
        error,
        refetch,
        reset,
        setData, // Allow manual data updates
    };
};

export default useFetch;
