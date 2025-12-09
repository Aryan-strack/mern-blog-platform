import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { fetchUserPosts } from '../store/slices/postSlice';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { formatDate } from '../utils/formatters';

const DashboardPage = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { userPosts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPosts(user._id));
        }
    }, [dispatch, user]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Blog Platform</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                    <Link to="/create-post">
                        <Button>Create New Post</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <h3 className="text-gray-600 text-sm mb-2">Total Posts</h3>
                        <p className="text-3xl font-bold">{userPosts?.length || 0}</p>
                    </Card>
                    <Card>
                        <h3 className="text-gray-600 text-sm mb-2">Total Views</h3>
                        <p className="text-3xl font-bold">
                            {userPosts?.reduce((acc, post) => acc + (post.viewCount || 0), 0) || 0}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-gray-600 text-sm mb-2">Total Likes</h3>
                        <p className="text-3xl font-bold">
                            {userPosts?.reduce((acc, post) => acc + (post.likes?.length || 0), 0) || 0}
                        </p>
                    </Card>
                </div>

                <Card>
                    <h2 className="text-2xl font-bold mb-6">My Posts</h2>

                    {isLoading ? (
                        <Loader />
                    ) : userPosts && userPosts.length > 0 ? (
                        <div className="space-y-4">
                            {userPosts.map((post) => (
                                <div key={post._id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{formatDate(post.createdAt)}</p>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <FiEye /> {post.viewCount || 0} views
                                                </span>
                                                <span>{post.likes?.length || 0} likes</span>
                                                <span>{post.commentsCount || 0} comments</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link to={`/edit-post/${post._id}`}>
                                                <Button size="sm" variant="outline">
                                                    <FiEdit2 className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button size="sm" variant="danger">
                                                <FiTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">
                            You haven't created any posts yet.{' '}
                            <Link to="/create-post" className="text-primary-600 hover:underline">
                                Create your first post
                            </Link>
                        </p>
                    )}
                </Card>
            </div>
        </>
    );
};

export default DashboardPage;
