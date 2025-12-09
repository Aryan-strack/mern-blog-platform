import React, { forwardRef } from 'react';

const TextArea = forwardRef(({
    label,
    name,
    placeholder = '',
    value,
    onChange,
    error = '',
    required = false,
    disabled = false,
    rows = 4,
    maxLength = null,
    showCount = false,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {showCount && maxLength && (
                        <span className="text-xs text-gray-500">
                            {value?.length || 0} / {maxLength}
                        </span>
                    )}
                </div>
            )}
            <textarea
                ref={ref}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                className={`block w-full px-3 py-2 border rounded-lg transition-all resize-none
          ${error
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                    }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          focus:outline-none focus:ring-2`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
