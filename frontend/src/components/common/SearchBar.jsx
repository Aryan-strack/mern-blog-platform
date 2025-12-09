import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { debounce } from '../../utils/helpers';

const SearchBar = ({
    onSearch,
    placeholder = 'Search...',
    delay = 500,
    className = '',
    autoFocus = false,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            onSearch(searchTerm);
        }, delay);

        debouncedSearch();
    }, [searchTerm, onSearch, delay]);

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                >
                    <FiX className="h-5 w-5 text-gray-400" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
