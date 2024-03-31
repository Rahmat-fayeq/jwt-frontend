import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from '../features/posts/postsSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(selectPosts);
console.log(posts)
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h2>Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Author: {post.author.username}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default PostPage;
