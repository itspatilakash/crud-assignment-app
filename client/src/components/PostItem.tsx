import { useState, type FormEvent } from 'react';
import type { Post } from '../types/post';

interface Props {
  post: Post;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Omit<Post, 'id'>) => void;
}

export default function PostItem({ post, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    onUpdate(post.id, { title, body });
    setIsEditing(false);
  };

  return (
    <div className="post-item">
      {isEditing ? (
        <form onSubmit={handleSave} className="post-form">
          <input
            className="input"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="textarea"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <div className="post-actions">
            <button type="submit" className="button">Save</button>
            <button
              type="button"
              className="link delete"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)} className="link edit">Edit</button>
            <button onClick={() => onDelete(post.id)} className="link delete">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
