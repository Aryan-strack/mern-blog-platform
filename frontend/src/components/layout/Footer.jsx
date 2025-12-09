import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Blog Platform</h3>
                        <p className="text-sm">
                            Share your thoughts, ideas, and stories with the world. Join our community of writers and readers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to={ROUTES.HOME} className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to={ROUTES.POSTS} className="hover:text-white transition-colors">Blog Posts</Link></li>
                            <li><Link to={ROUTES.CREATE_POST} className="hover:text-white transition-colors">Write</Link></li>
                            <li><Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">Profile</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Programming</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Lifestyle</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">
                                <FiGithub className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FiTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FiLinkedin className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <FiMail className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {currentYear} Blog Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
