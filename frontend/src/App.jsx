// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';

import { store } from './store/store';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import ErrorFallback from './components/common/ErrorFallback';
import { getCurrentUser } from './store/slices/authSlice';

import './App.css';

function App() {
  useEffect(() => {
    // Check for token and fetch user on app load
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(getCurrentUser());
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <HelmetProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Layout>
                <AppRoutes />
              </Layout>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 4000,
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </HelmetProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;