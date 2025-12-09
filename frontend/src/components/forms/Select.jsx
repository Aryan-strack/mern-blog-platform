import React, { forwardRef } from 'react';

const Select = forwardRef(({
    label,
    name,
    options = [],
    value,
    onChange,
    error = '',
    required = false,
    disabled = false,
    placeholder = 'Select an option',
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                ref={ref}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`block w-full px-3 py-2 border rounded-lg transition-all
          ${error
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                    }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          focus:outline-none focus:ring-2`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
