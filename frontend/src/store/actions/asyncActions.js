import { createAsyncThunk } from '@reduxjs/toolkit';
import { setGlobalLoading } from '../slices/uiSlice';

/**
 * Wrapper for async thunks that manages global loading state
 */
export const createAsyncThunkWithLoading = (typePrefix, payloadCreator) => {
    return createAsyncThunk(typePrefix, async (arg, thunkAPI) => {
        thunkAPI.dispatch(setGlobalLoading(true));
        try {
            const result = await payloadCreator(arg, thunkAPI);
            return result;
        } finally {
            thunkAPI.dispatch(setGlobalLoading(false));
        }
    });
};

/**
 * Generic error handler for async thunks
 */
export const handleAsyncError = (error, rejectWithValue) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return rejectWithValue(message);
};

/**
 * Retry async operation
 */
export const retryAsyncOperation = async (operation, maxRetries = 3, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
};

export default {
    createAsyncThunkWithLoading,
    handleAsyncError,
    retryAsyncOperation,
};
