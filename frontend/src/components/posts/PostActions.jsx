import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../../store/slices/postSlice';
import { FiHeart, FiMessageSquare, FiEye } from 'react-icons/fi';
import { formatCompactNumber } from '../../../utils/formatters';

const PostActions = ({ post }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLike = () => {
        if (user) {
            dispatch(likePost(post._id));
        }
    };

    return (
        <div className="flex items-center gap-6 py-4 border-y border-gray-200">
            <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
                <FiHeart className={post.isLiked ? 'fill-current text-red-500' : ''} />
                <span>{formatCompactNumber(post.likes?.length || 0)}</span>
            </button>

            <div className="flex items-center gap-2 text-gray-600">
                <FiMessageSquare />
                <span>{formatCompactNumber(post.commentsCount || 0)}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
                <FiEye />
                <span>{formatCompactNumber(post.viewCount || 0)}</span>
            </div>
        </div>
    );
};

export default PostActions;
