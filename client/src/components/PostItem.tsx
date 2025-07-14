import type { Post } from '../types/post';

interface Props {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostItem({ post, onEdit, onDelete }: Props) {
  return (
   <div className="post-item">
  <h3 className="post-title">{post.title}</h3>
  <p className="post-body">{post.body}</p>
  <div className="post-actions">
    <button onClick={() => onEdit(post)} className="link edit">Edit</button>
    <button onClick={() => onDelete(post.id)} className="link delete">Delete</button>
  </div>
</div>

  );
}
