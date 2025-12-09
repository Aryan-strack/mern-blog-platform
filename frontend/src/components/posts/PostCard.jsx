// src/components/posts/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaHeart, FaComment, FaClock } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { likePost } from '../../store/slices/postSlice';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const isLiked = post.likes?.includes(user?._id);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }
    
    try {
      await dispatch(likePost(post._id)).unwrap();
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const truncateText = (text, length = 150) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <Link
      to={`/posts/${post._id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.featuredImage || '/default-post.jpg'}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {post.categories[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Link
            to={`/profile/${post.author?._id}`}
            className="flex items-center hover:text-primary-600"
            onClick={(e) => e.stopPropagation()}
          >
            {post.author?.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                <span className="text-xs text-primary-600 font-medium">
                  {post.author?.username?.[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <span>{post.author?.username}</span>
          </Link>
          <span className="mx-2">•</span>
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(post.excerpt || post.content)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <FaHeart className={isLiked ? 'fill-current' : ''} />
              <span>{post.likes?.length || 0}</span>
            </button>
            <div className="flex items-center space-x-1">
              <FaComment />
              <span>{post.commentsCount || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEye />
              <span>{post.viewCount || 0}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <FaClock />
            <span>{post.readingTime || 5} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;