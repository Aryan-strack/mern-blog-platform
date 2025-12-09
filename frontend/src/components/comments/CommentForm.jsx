import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../store/slices/commentSlice';
import TextArea from '../../forms/TextArea';
import Button from '../../common/Button';
import { toast } from 'react-hot-toast';

const CommentForm = ({ postId, parentCommentId = null, onSuccess = null }) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsLoading(true);
        try {
            await dispatch(addComment({
                content,
                postId,
                parentCommentId
            })).unwrap();
            setContent('');
            toast.success('Comment added!');
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error || 'Failed to add comment');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextArea
                name="content"
                placeholder={parentCommentId ? "Write a reply..." : "Write a comment..."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                maxLength={1000}
                showCount
            />
            <Button type="submit" loading={isLoading} disabled={!content.trim()}>
                {parentCommentId ? 'Reply' : 'Comment'}
            </Button>
        </form>
    );
};

export default CommentForm;
