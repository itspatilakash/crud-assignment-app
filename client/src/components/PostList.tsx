import { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/PostService';
import type { Post } from '../types/post';
import PostForm from './PostForm';
import PostItem from './PostItem';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data)).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: Omit<Post, 'id'>) => {
    const res = await createPost(data);
    setPosts(prev => [res.data, ...prev]);
  };

  const handleUpdate = async (data: Omit<Post, 'id'>) => {
    if (!editing) return;
    const res = await updatePost(editing.id, data);
    setPosts(prev => prev.map(p => p.id === editing.id ? res.data : p));
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Posts</h1>
      <PostForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initialData={editing || undefined}
        isEditing={!!editing}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
