import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedPosts } from '../../../store/slices/postSlice';
import PostCard from './PostCard';
import Loader from '../../common/Loader';

const FeaturedPosts = () => {
    const dispatch = useDispatch();
    const { featuredPosts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchFeaturedPosts());
    }, [dispatch]);

    if (isLoading) return <Loader />;
    if (!featuredPosts || featuredPosts.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
                <PostCard key={post._id} post={post} featured />
            ))}
        </div>
    );
};

export default FeaturedPosts;
