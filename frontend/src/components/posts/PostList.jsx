import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return (
            <p className="text-center text-gray-500 py-12">
                No posts found.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
