import React, { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

const FileUpload = ({
    label,
    name,
    onChange,
    error = '',
    required = false,
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB
    preview = true,
    className = '',
}) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validate file size
        if (selectedFile.size > maxSize) {
            setUploadError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
            return;
        }

        setUploadError('');
        setFile(selectedFile);

        // Create preview
        if (preview && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }

        onChange(selectedFile);
    };

    const handleRemove = () => {
        setFile(null);
        setPreviewUrl(null);
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onChange(null);
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {!file ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
                >
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">Max size: {maxSize / (1024 * 1024)}MB</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        name={name}
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="relative border border-gray-300 rounded-lg p-4">
                    {previewUrl ? (
                        <div className="relative">
                            <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded" />
                            <button
                                onClick={handleRemove}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                                <FiX className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiImage className="h-5 w-5 text-gray-400" />
                                <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <button
                                onClick={handleRemove}
                                className="text-red-500 hover:text-red-600"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {(error || uploadError) && (
                <p className="mt-1 text-sm text-red-600">{error || uploadError}</p>
            )}
        </div>
    );
};

export default FileUpload;
