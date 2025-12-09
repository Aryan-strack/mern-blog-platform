// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../store/slices/postSlice';

import Hero from '../components/common/Hero';
import FeaturedPosts from '../components/posts/FeaturedPosts';
import PostList from '../components/posts/PostList';
import Categories from '../components/posts/Categories';
import Loader from '../components/common/Loader';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { posts, featuredPosts, isLoading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ limit: 6 }));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Blog Platform | Home</title>
        <meta name="description" content="Welcome to our blog platform" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero
          title="Welcome to Blog Platform"
          subtitle="Share your thoughts, ideas, and stories with the world"
          ctaText="Start Writing"
          ctaLink="/create-post"
        />

        {/* Featured Posts */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
              <Link
                to="/posts"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <FeaturedPosts />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Posts List */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
                  <Link
                    to="/posts"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    Browse All
                  </Link>
                </div>
                
                {isLoading ? (
                  <Loader />
                ) : posts.length > 0 ? (
                  <PostList posts={posts} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No posts found. Be the first to create one!</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Categories />
                
                {/* Call to Action */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-8">
                  <h3 className="text-xl font-bold mb-3">Start Writing Today</h3>
                  <p className="mb-4">Share your knowledge and experiences with our community.</p>
                  <Link
                    to="/create-post"
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition inline-block"
                  >
                    Create Post
                  </Link>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Platform Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Posts</span>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-bold">567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categories</span>
                      <span className="font-bold">24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;