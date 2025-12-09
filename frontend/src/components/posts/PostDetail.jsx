import React from 'react';
import { formatDate, formatReadingTime } from '../../../utils/formatters';
import PostActions from './PostActions';

const PostDetail = ({ post }) => {
    return (
        <article className="max-w-4xl mx-auto">
            {post.featuredImage && (
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                />
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                    <img
                        src={post.author?.avatar}
                        alt={post.author?.username}
                        className="w-10 h-10 rounded-full"
                    />
                    <span>{post.author?.username}</span>
                </div>
                <span>{formatDate(post.createdAt, 'long')}</span>
                <span>{formatReadingTime(post.readingTime)}</span>
            </div>

            <PostActions post={post} />

            <div
                className="prose prose-lg max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
};

export default PostDetail;
