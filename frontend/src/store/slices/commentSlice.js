import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from '../../services/commentService';

// Async thunks
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await commentService.getCommentsByPost(postId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
        }
    }
);

export const addComment = createAsyncThunk(
    'comments/addComment',
    async (commentData, { rejectWithValue }) => {
        try {
            const response = await commentService.createComment(commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
        }
    }
);

export const updateComment = createAsyncThunk(
    'comments/updateComment',
    async ({ commentId, commentData }, { rejectWithValue }) => {
        try {
            const response = await commentService.updateComment(commentId, commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update comment');
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId, { rejectWithValue }) => {
        try {
            await commentService.deleteComment(commentId);
            return commentId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
        }
    }
);

export const likeComment = createAsyncThunk(
    'comments/likeComment',
    async (commentId, { rejectWithValue }) => {
        try {
            const response = await commentService.likeComment(commentId);
            return { commentId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to like comment');
        }
    }
);

const initialState = {
    comments: [],
    currentComment: null,
    isLoading: false,
    error: null,
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = [];
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch comments
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload.comments || [];
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add comment
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments.unshift(action.payload.comment);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update comment
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(c => c._id === action.payload.comment._id);
                if (index !== -1) {
                    state.comments[index] = action.payload.comment;
                }
            })

            // Delete comment
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(c => c._id !== action.payload);
            })

            // Like comment
            .addCase(likeComment.fulfilled, (state, action) => {
                const comment = state.comments.find(c => c._id === action.payload.commentId);
                if (comment) {
                    comment.likes = action.payload.likes;
                    comment.isLiked = action.payload.isLiked;
                }
            });
    },
});

export const { clearComments, clearError } = commentSlice.actions;
export default commentSlice.reducer;
