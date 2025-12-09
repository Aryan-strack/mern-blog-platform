import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchPosts } from '../store/slices/postSlice';
import PostList from '../components/posts/PostList';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import Select from '../components/forms/Select';
import { SORT_OPTIONS } from '../utils/constants';

const PostsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { posts, pagination, isLoading } = useSelector((state) => state.posts);

    const currentPage = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || SORT_OPTIONS.LATEST;

    useEffect(() => {
        dispatch(fetchPosts({
            page: currentPage,
            search,
            sort,
            limit: 12,
        }));
    }, [dispatch, currentPage, search, sort]);

    const handleSearch = (searchTerm) => {
        setSearchParams({ search: searchTerm, page: '1', sort });
    };

    const handlePageChange = (page) => {
        setSearchParams({ search, page: page.toString(), sort });
    };

    const handleSortChange = (e) => {
        setSearchParams({ search, page: '1', sort: e.target.value });
    };

    const sortOptions = [
        { value: SORT_OPTIONS.LATEST, label: 'Latest' },
        { value: SORT_OPTIONS.OLDEST, label: 'Oldest' },
        { value: SORT_OPTIONS.MOST_VIEWED, label: 'Most Viewed' },
        { value: SORT_OPTIONS.MOST_LIKED, label: 'Most Liked' },
    ];

    return (
        <>
            <Helmet>
                <title>All Posts | Blog Platform</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">All Posts</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <SearchBar onSearch={handleSearch} placeholder="Search posts..." />
                    </div>
                    <Select
                        name="sort"
                        value={sort}
                        onChange={handleSortChange}
                        options={sortOptions}
                        className="md:w-48"
                    />
                </div>

                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <PostList posts={posts} />

                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={pagination.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default PostsPage;
