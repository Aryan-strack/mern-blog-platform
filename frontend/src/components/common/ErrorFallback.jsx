import React from 'react';
import Button from './Button';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Something went wrong
                </h2>
                <p className="text-gray-600 mb-6">
                    {error?.message || 'An unexpected error occurred'}
                </p>
                <Button onClick={resetErrorBoundary}>
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default ErrorFallback;
