import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../store/slices/authSlice';
import Input from '../../forms/Input';
import TextArea from '../../forms/TextArea';
import FileUpload from '../../forms/FileUpload';
import Button from '../../common/Button';
import ErrorMessage from '../../common/ErrorMessage';
import { toast } from 'react-hot-toast';

const ProfileForm = () => {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
        avatar: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                bio: user.bio || '',
                avatar: null
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const updateData = new FormData();
            updateData.append('username', formData.username);
            updateData.append('email', formData.email);
            updateData.append('bio', formData.bio);
            if (formData.avatar) {
                updateData.append('avatar', formData.avatar);
            }
            await dispatch(updateProfile(updateData)).unwrap();
            toast.success('Profile updated successfully!');
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}
            <FileUpload
                label="Profile Picture"
                name="avatar"
                onChange={(file) => setFormData({ ...formData, avatar: file })}
            />
            <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <TextArea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                maxLength={500}
                showCount
            />
            <Button type="submit" fullWidth loading={isLoading}>
                Update Profile
            </Button>
        </form>
    );
};

export default ProfileForm;
