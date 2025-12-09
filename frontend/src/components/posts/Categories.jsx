import React from 'react';
import { BLOG_CATEGORIES } from '../../../utils/constants';
import Card from '../../common/Card';

const Categories = () => {
    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.map((category) => (
                    <a
                        key={category}
                        href={`/posts?category=${category}`}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                        {category}
                    </a>
                ))}
            </div>
        </Card>
    );
};

export default Categories;
