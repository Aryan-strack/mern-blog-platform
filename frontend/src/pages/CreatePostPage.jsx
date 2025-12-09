import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/slices/postSlice';
import PostForm from '../components/posts/PostForm';
import Card from '../components/common/Card';
import { toast } from 'react-hot-toast';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (postData) => {
        setIsLoading(true);
        try {
            await dispatch(createPost(postData)).unwrap();
            toast.success('Post created successfully!');
            navigate('/posts');
        } catch (error) {
            toast.error(error || 'Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Create Post | Blog Platform</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
                    <Card>
                        <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CreatePostPage;
