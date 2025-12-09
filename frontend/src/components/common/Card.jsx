import React from 'react';

const Card = ({
    children,
    className = '',
    padding = 'md',
    shadow = true,
    hover = false,
    onClick = null,
    ...props
}) => {
    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const shadowClass = shadow ? 'shadow-md' : '';
    const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
    const clickableClass = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`bg-white rounded-lg ${paddings[padding]} ${shadowClass} ${hoverClass} ${clickableClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

Card.Header = ({ children, className = '' }) => (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
        {children}
    </div>
);

Card.Body = ({ children, className = '' }) => (
    <div className={className}>
        {children}
    </div>
);

Card.Footer = ({ children, className = '' }) => (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
        {children}
    </div>
);

export default Card;
