import { useState, type FormEvent } from 'react';
import type { Post } from '../types/post';

interface Props {
  onSubmit: (data: Omit<Post, 'id'>) => void;
  initialData?: Omit<Post, 'id'>;
  isEditing?: boolean;
}

export default function PostForm({ onSubmit, initialData, isEditing = false }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    onSubmit({ title, body });
    if (!isEditing) {
      setTitle('');
      setBody('');
    }
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
  <button
    type="submit"
    className="button"
  >
    {isEditing ? 'Update Post' : 'Create Post'}
  </button>
</form>

  );
}
