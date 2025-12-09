import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/slices/postSlice';
import PostDetail from '../components/posts/PostDetail';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const PostDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentPost, isLoading, error } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(fetchPost(id));
        }
    }, [dispatch, id]);

    if (isLoading) return <Loader fullScreen />;
    if (error) return <ErrorMessage message={error} />;
    if (!currentPost) return <ErrorMessage message="Post not found" />;

    return (
        <>
            <Helmet>
                <title>{currentPost.title} | Blog Platform</title>
                <meta name="description" content={currentPost.excerpt} />
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <PostDetail post={currentPost} />

                <div className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

                    {user ? (
                        <div className="mb-8">
                            <CommentForm postId={id} />
                        </div>
                    ) : (
                        <p className="text-gray-600 mb-8">
                            Please <a href="/login" className="text-primary-600 hover:underline">login</a> to comment.
                        </p>
                    )}

                    <CommentList postId={id} />
                </div>
            </div>
        </>
    );
};

export default PostDetailPage;
