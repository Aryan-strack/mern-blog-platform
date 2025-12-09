import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../../store/slices/authSlice';
import Input from '../../forms/Input';
import Button from '../../common/Button';
import ErrorMessage from '../../common/ErrorMessage';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { isValidEmail, isValidUsername, isValidPassword } from '../../../utils/validators';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (!isValidUsername(formData.username)) {
            newErrors.username = 'Invalid username (3-30 chars, alphanumeric)';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!isValidPassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsLoading(true);
        setApiError('');
        try {
            const { confirmPassword, ...registerData } = formData;
            await dispatch(register(registerData)).unwrap();
            navigate('/');
        } catch (error) {
            setApiError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && <ErrorMessage message={apiError} />}
            <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                error={errors.username}
                icon={<FiUser className="h-5 w-5 text-gray-400" />}
                required
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                icon={<FiMail className="h-5 w-5 text-gray-400" />}
                required
            />
            <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                icon={<FiLock className="h-5 w-5 text-gray-400" />}
                required
            />
            <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                icon={<FiLock className="h-5 w-5 text-gray-400" />}
                required
            />
            <Button type="submit" fullWidth loading={isLoading}>
                Create Account
            </Button>
        </form>
    );
};

export default RegisterForm;
