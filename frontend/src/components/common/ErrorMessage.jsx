import React from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const ErrorMessage = ({
    message,
    onClose = null,
    type = 'error',
    className = ''
}) => {
    if (!message) return null;

    const types = {
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    return (
        <div className={`border rounded-lg p-4 flex items-start ${types[type]} ${className}`}>
            <FiAlertCircle className="flex-shrink-0 h-5 w-5 mr-3 mt-0.5" />
            <div className="flex-1">
                <p className="text-sm">{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="flex-shrink-0 ml-3 hover:opacity-75 transition-opacity"
                >
                    <FiX className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
