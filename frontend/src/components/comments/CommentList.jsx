import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../../store/slices/commentSlice';
import CommentItem from './CommentItem';
import Loader from '../../common/Loader';
import ErrorMessage from '../../common/ErrorMessage';

const CommentList = ({ postId }) => {
    const dispatch = useDispatch();
    const { comments, isLoading, error } = useSelector((state) => state.comments);

    useEffect(() => {
        if (postId) {
            dispatch(fetchComments(postId));
        }
    }, [dispatch, postId]);

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    if (comments.length === 0) {
        return (
            <p className="text-center text-gray-500 py-8">
                No comments yet. Be the first to comment!
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={postId} />
            ))}
        </div>
    );
};

export default CommentList;
