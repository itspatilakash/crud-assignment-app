import type { Post } from '../types/post';

interface Props {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostItem({ post, onEdit, onDelete }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{post.title}</h3>
      <p className="text-gray-700">{post.body}</p>
      <div className="mt-2 space-x-2">
        <button onClick={() => onEdit(post)} className="text-blue-500">Edit</button>
        <button onClick={() => onDelete(post.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}
