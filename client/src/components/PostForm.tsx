import { useState, type FormEvent } from 'react';
import type { Post } from '../types/post';

interface Props {
  onSubmit: (data: Omit<Post, 'id'>) => void;
}

export default function PostForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    
    setIsLoading(true);
    try {
      await onSubmit({ title: title.trim(), body: body.trim() });
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
       <h2>✨ Create New Post</h2>
      <input
        className="input"
        placeholder="Enter an amazing title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={isLoading}
        maxLength={100}
      />
      <textarea
        className="textarea"
        placeholder="Share your thoughts..."
        value={body}
        onChange={e => setBody(e.target.value)}
        disabled={isLoading}
        maxLength={500}
      />
      <button type="submit" className="button" disabled={isLoading || !title.trim() || !body.trim()}> {isLoading ? '✨ Creating...' : 'Create Post'}</button>
    </form>
  );
}
