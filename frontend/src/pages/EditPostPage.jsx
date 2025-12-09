import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, updatePost } from '../store/slices/postSlice';
import PostForm from '../components/posts/PostForm';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { toast } from 'react-hot-toast';

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentPost, isLoading } = useSelector((state) => state.posts);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchPost(id));
        }
    }, [dispatch, id]);

    const handleSubmit = async (postData) => {
        setSubmitting(true);
        try {
            await dispatch(updatePost({ id, postData })).unwrap();
            toast.success('Post updated successfully!');
            navigate(`/posts/${id}`);
        } catch (error) {
            toast.error(error || 'Failed to update post');
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) return <Loader fullScreen />;

    return (
        <>
            <Helmet>
                <title>Edit Post | Blog Platform</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
                    <Card>
                        {currentPost && (
                            <PostForm
                                initialData={currentPost}
                                onSubmit={handleSubmit}
                                isLoading={submitting}
                                isEdit
                            />
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default EditPostPage;
