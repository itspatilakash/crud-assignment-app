import { useState, type FormEvent } from 'react';
import type { Post } from '../types/post';

interface Props {
  post: Post;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Omit<Post, 'id'>) => void;
}

export default function PostItem({ post, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onUpdate(post.id, { title: title.trim(), body: body.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(post.title);
    setBody(post.body);
    setIsEditing(false);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = () => {
    if (!isEditing) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isBodyLong = post.body.length > 200;


  return (
    <div className="post-item" onClick={handleCardClick}>
      {isEditing ? (
        <div className="post-edit-form">
        <form onSubmit={handleSave} className="post-form">
          <input
            className="input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter title..."
            autoFocus
          />
          <textarea
            className="textarea"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Enter body..."
            rows={6}
          />
          <div className="post-actions" onClick={handleActionClick}>
            <button type="submit" className="button save-btn">Save</button>
            <button
              type="button"
              className="link cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      ) : (
         <div className="post-content">
          <h3 className="post-title">{post.title}</h3>
          <div className="post-body-container">
           <p className={`post-body ${isExpanded ? 'expanded' : ''}`}>{post.body}</p>
           {isBodyLong && (
              <button 
                className="read-more-btn" 
                onClick={toggleExpand}
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
          <div className="post-actions" onClick={handleActionClick}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }} 
              className="link edit"
            >
              Edit
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post.id);
              }} 
              className="link delete"
            >
              Delete
            </button>
          </div>
        </div> 
      )}
    </div>
  );
}