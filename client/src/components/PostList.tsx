import { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/postService.ts';
import type { Post } from '../types/post';
import PostForm from './PostForm';
import PostItem from './PostItem';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data)).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: Omit<Post, 'id'>) => {
    const res = await createPost(data);
    setPosts(prev => [res.data, ...prev]);
  };

  const handleUpdate = async (id: number, data: Omit<Post, 'id'>) => {
    const res = await updatePost(id, data);
    setPosts(prev => prev.map(p => (p.id === id ? res.data : p)));
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="app">
      <h1 className="title">Posts</h1>
      <PostForm onSubmit={handleCreate} />
      {loading ? (
        <p>Loading...</p>
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
