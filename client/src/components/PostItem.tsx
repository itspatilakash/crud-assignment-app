import type { Post } from '../types/post';

interface Props {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostItem({ post, onEdit, onDelete }: Props) {
  return (
   <div className="bg-gray-50 p-4 border rounded shadow-sm">
  <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
  <p className="text-gray-600 mt-1">{post.body}</p>
  <div className="mt-3 flex gap-3">
    <button onClick={() => onEdit(post)} className="text-blue-600 hover:underline">Edit</button>
    <button onClick={() => onDelete(post.id)} className="text-red-500 hover:underline">Delete</button>
  </div>
</div>

  );
}
