import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FiX className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        <Link
                            to={ROUTES.HOME}
                            onClick={onClose}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to={ROUTES.POSTS}
                            onClick={onClose}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Blog Posts
                        </Link>
                        <Link
                            to={ROUTES.CREATE_POST}
                            onClick={onClose}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Write
                        </Link>
                        <Link
                            to={ROUTES.PROFILE}
                            onClick={onClose}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Profile
                        </Link>
                        <Link
                            to={ROUTES.DASHBOARD}
                            onClick={onClose}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
