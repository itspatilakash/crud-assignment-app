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
    <form onSubmit={handleSubmit} className="space-y-4">
  <input
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Title"
    value={title}
    onChange={e => setTitle(e.target.value)}
  />
  <textarea
    className="w-full p-3 border border-gray-300 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Body"
    value={body}
    onChange={e => setBody(e.target.value)}
  />
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    {isEditing ? 'Update Post' : 'Create Post'}
  </button>
</form>

  );
}
