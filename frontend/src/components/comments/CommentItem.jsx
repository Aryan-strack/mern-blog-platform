import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, likeComment } from '../../../store/slices/commentSlice';
import { formatDate } from '../../../utils/formatters';
import { FiHeart, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import CommentForm from './CommentForm';

const CommentItem = ({ comment, postId }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleLike = () => {
        dispatch(likeComment(comment._id));
    };

    const handleDelete = () => {
        if (window.confirm('Delete this comment?')) {
            dispatch(deleteComment(comment._id));
        }
    };

    const isAuthor = user?._id === comment.author?._id;

    return (
        <div className="border-l-2 border-gray-200 pl-4 mb-4">
            <div className="flex items-start gap-3">
                <img
                    src={comment.author?.avatar || '/default-avatar.png'}
                    alt={comment.author?.username}
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author?.username}</span>
                        <span className="text-sm text-gray-500">
                            {formatDate(comment.createdAt, 'relative')}
                        </span>
                        {comment.isEdited && (
                            <span className="text-xs text-gray-400">(edited)</span>
                        )}
                    </div>
                    <p className="text-gray-700 mt-1">{comment.content}</p>

                    <div className="flex items-center gap-4 mt-2">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <FiHeart className={comment.isLiked ? 'fill-current text-red-500' : ''} />
                            {comment.likes?.length || 0}
                        </button>
                        <button
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            <FiMessageSquare /> Reply
                        </button>
                        {isAuthor && (
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                            >
                                <FiTrash2 /> Delete
                            </button>
                        )}
                    </div>

                    {showReplyForm && (
                        <div className="mt-3">
                            <CommentForm
                                postId={postId}
                                parentCommentId={comment._id}
                                onSuccess={() => setShowReplyForm(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
