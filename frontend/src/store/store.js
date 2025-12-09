// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import commentReducer from './slices/commentSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['posts/createPost/fulfilled', 'posts/updatePost/fulfilled'],
        ignoredPaths: ['posts.currentPost.featuredImage'],
      },
    }).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

// Custom hooks for typed dispatch and selector
export default store;