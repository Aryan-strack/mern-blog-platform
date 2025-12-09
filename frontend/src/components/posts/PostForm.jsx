// src/components/posts/PostForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPost, updatePost } from '../../store/slices/postSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Input from '../forms/Input';
import TextArea from '../forms/TextArea';
import Select from '../forms/Select';
import FileUpload from '../forms/FileUpload';
import Button from '../common/Button';
import Loader from '../common/Loader';

const PostForm = ({ post = null, isEditing = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  
  // Uncontrolled component example (search input using ref)
  const searchInputRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      categories: post?.categories?.join(',') || '',
      tags: post?.tags?.join(',') || '',
      status: post?.status || 'draft',
      featuredImage: null,
    },
  });
  
  const [content, setContent] = useState(post?.content || '');
  const [imagePreview, setImagePreview] = useState(post?.featuredImage || '');
  
  // Update form when post changes
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        categories: post.categories?.join(',') || '',
        tags: post.tags?.join(',') || '',
        status: post.status,
      });
      setContent(post.content);
      setImagePreview(post.featuredImage);
    }
  }, [post, reset]);
  
  // Handle content change from Quill editor
  const handleContentChange = (value) => {
    setContent(value);
    setValue('content', value);
  };
  
  // Handle image upload
  const handleImageUpload = (file) => {
    setValue('featuredImage', file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        author: user?._id,
      };
      
      if (isEditing && post) {
        await dispatch(updatePost({ id: post._id, postData: formData })).unwrap();
        toast.success('Post updated successfully!');
        navigate(`/posts/${post._id}`);
      } else {
        const result = await dispatch(createPost(formData)).unwrap();
        toast.success('Post created successfully!');
        navigate(`/posts/${result.post._id}`);
      }
    } catch (error) {
      toast.error(error || 'Something went wrong!');
    }
  };
  
  // Example of uncontrolled component usage
  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  };
  
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Uncontrolled Component Example */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium mb-2">Quick Search (Uncontrolled Component)</h3>
        <div className="flex gap-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Type to search..."
            className="flex-1 px-3 py-2 border rounded-lg"
            defaultValue=""
          />
          <button
            onClick={handleSearchFocus}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Focus Input
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          This input uses useRef (uncontrolled component) for direct DOM access
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <Input
          label="Title"
          name="title"
          register={register}
          validation={{
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters',
            },
            maxLength: {
              value: 200,
              message: 'Title cannot exceed 200 characters',
            },
          }}
          error={errors.title}
          placeholder="Enter post title"
        />
        
        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <FileUpload
            onFileSelect={handleImageUpload}
            preview={imagePreview}
            accept="image/*"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload a high-quality image for your post (Max: 5MB)
          </p>
        </div>
        
        {/* Excerpt */}
        <TextArea
          label="Excerpt"
          name="excerpt"
          register={register}
          validation={{
            maxLength: {
              value: 500,
              message: 'Excerpt cannot exceed 500 characters',
            },
          }}
          error={errors.excerpt}
          placeholder="Brief summary of your post"
          rows={3}
        />
        
        {/* Content - Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={quillModules}
            className="h-64 mb-12"
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
          )}
          <input type="hidden" {...register('content', { required: 'Content is required' })} />
        </div>
        
        {/* Categories and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Categories (comma separated)"
            name="categories"
            register={register}
            placeholder="e.g., Technology, Programming, Web Development"
          />
          
          <Input
            label="Tags (comma separated)"
            name="tags"
            register={register}
            placeholder="e.g., react, javascript, tutorial"
          />
        </div>
        
        {/* Status */}
        <Select
          label="Status"
          name="status"
          register={register}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
        />
        
        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader size="small" className="mr-2" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              isEditing ? 'Update Post' : 'Create Post'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;