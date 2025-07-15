import { Router } from 'express';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const router = Router();
let posts: Post[] = [];

router.get('/', async (_, res) => {
  if (posts.length === 0) {
    const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    posts = data;
  }
  res.json(posts);
//   res.send('Backend is running');
});

router.post('/', (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: Date.now(), title, body };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const postIndex = posts.findIndex(p => p.id === +id);
  if (postIndex === -1) return res.sendStatus(404);
  posts[postIndex] = { ...posts[postIndex], title, body };
  res.json(posts[postIndex]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter(p => p.id !== +id);
  res.sendStatus(204);
});

export default router;
