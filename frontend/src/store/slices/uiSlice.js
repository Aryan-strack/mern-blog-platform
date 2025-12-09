import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Modal state
    modal: {
        isOpen: false,
        type: null, // 'confirm', 'alert', 'custom'
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
    },

    // Sidebar state
    sidebar: {
        isOpen: false,
    },

    // Theme
    theme: localStorage.getItem('theme') || 'light',

    // Loading overlay
    isGlobalLoading: false,

    // Search
    searchQuery: '',
    isSearchOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // Modal actions
        openModal: (state, action) => {
            state.modal = {
                isOpen: true,
                ...action.payload,
            };
        },
        closeModal: (state) => {
            state.modal = {
                isOpen: false,
                type: null,
                title: '',
                message: '',
                onConfirm: null,
                onCancel: null,
            };
        },

        // Sidebar actions
        toggleSidebar: (state) => {
            state.sidebar.isOpen = !state.sidebar.isOpen;
        },
        openSidebar: (state) => {
            state.sidebar.isOpen = true;
        },
        closeSidebar: (state) => {
            state.sidebar.isOpen = false;
        },

        // Theme actions
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        toggleTheme: (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        },

        // Global loading
        setGlobalLoading: (state, action) => {
            state.isGlobalLoading = action.payload;
        },

        // Search actions
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        toggleSearch: (state) => {
            state.isSearchOpen = !state.isSearchOpen;
        },
        openSearch: (state) => {
            state.isSearchOpen = true;
        },
        closeSearch: (state) => {
            state.isSearchOpen = false;
            state.searchQuery = '';
        },
    },
});

export const {
    openModal,
    closeModal,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setTheme,
    toggleTheme,
    setGlobalLoading,
    setSearchQuery,
    toggleSearch,
    openSearch,
    closeSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
