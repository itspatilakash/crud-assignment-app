import axios from 'axios';
import type { Post } from '../types/post';

const API = 'http://localhost:3001/api/posts';

export const getPosts = () => axios.get<Post[]>(API);
export const createPost = (post: Omit<Post, 'id'>) => axios.post<Post>(API, post);
export const updatePost = (id: number, post: Omit<Post, 'id'>) => axios.put<Post>(`${API}/${id}`, post);
export const deletePost = (id: number) => axios.delete(`${API}/${id}`);
