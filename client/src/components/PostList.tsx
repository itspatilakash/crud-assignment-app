import { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/postService.ts';
import type { Post } from '../types/post';
import PostForm from './PostForm';
import PostItem from './PostItem';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Post, 'id'>) => {
    try {
    const res = await createPost(data);
    setPosts(prev => [res.data, ...prev]);
    }catch (err) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', err);
      throw err; 
    }
  };

  const handleUpdate = async (id: number, data: Omit<Post, 'id'>) => {
    try{
      const res = await updatePost(id, data);
    setPosts(prev => prev.map(p => (p.id === id ? res.data : p)));
    }catch(err){
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', err);
    }
  };

  const handleDelete = async (id: number) => {
   try{
     await deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
   } catch(err){
    setError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', err);
   }
  };
  if (loading) {
    return (
      <div className="app">
        <h1 className="title">Posts</h1>
        <div className="loading">✨ Loading amazing posts...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1 className="title">Posts</h1>
      <PostForm onSubmit={handleCreate} />
      {error && (
        <div style={{ 
          background: 'rgba(229, 62, 62, 0.1)', 
          color: '#e53e3e', 
          padding: '1rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          {error}
        </div>
      )}
      {posts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          🎉 No posts yet! Create your first post above.
        </div>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}