// src/hooks/useForm.js
import { useState, useCallback } from 'react';

const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const setFieldValue = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
  }, [initialState]);

  const validateField = useCallback((name, validator) => {
    const error = validator(formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
    return !error;
  }, [formData]);

  const validateForm = useCallback((validators) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validators).forEach(name => {
      const error = validators[name](formData[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  return {
    formData,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
    validateField,
    validateForm,
    setFormData,
  };
};

export default useForm;