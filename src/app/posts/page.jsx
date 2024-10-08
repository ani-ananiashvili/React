"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import Link from "next/link";
import "./index.css"; 

const PostsFetch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Set loading to false whether success or failure
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>; // Loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error if any
  }

  return (
    <div className="posts-container">
      <h1 className="header-title">Blog Posts</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body.slice(0, 100)}...</p>
            <div className="post-footer">
              <p className="post-tags">
                Tags: {post.tags.map((tag, index) => (
                  <span key={index} className="tag-item">#{tag}</span>
                ))}
              </p>
              <p className="post-views">Views: {post.views}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsFetch;
