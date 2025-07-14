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
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
