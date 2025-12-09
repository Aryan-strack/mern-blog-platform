import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/slices/authSlice';
import Input from '../../forms/Input';
import Button from '../../common/Button';
import ErrorMessage from '../../common/ErrorMessage';
import { FiMail, FiLock } from 'react-icons/fi';
import { isValidEmail } from '../../../utils/validators';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.password) newErrors.password = 'Password is required';
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
            await dispatch(login(formData)).unwrap();
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
            <Button type="submit" fullWidth loading={is_loading}>
                Sign In
            </Button>
        </form>
    );
};

export default LoginForm;
