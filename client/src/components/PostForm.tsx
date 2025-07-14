import { useState, type FormEvent } from 'react';
import type { Post } from '../types/post';

interface Props {
  onSubmit: (data: Omit<Post, 'id'>) => void;
}

export default function PostForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    onSubmit({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="textarea"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <button type="submit" className="button">Create Post</button>
    </form>
  );
}
