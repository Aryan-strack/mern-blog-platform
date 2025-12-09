import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import ProfileForm from '../components/auth/ProfileForm';
import Card from '../components/common/Card';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Helmet>
                <title>Profile | Blog Platform</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

                    <Card className="mb-6">
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={user?.avatar || '/default-avatar.png'}
                                alt={user?.username}
                                className="w-20 h-20 rounded-full"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{user?.username}</h2>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                        <ProfileForm />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
