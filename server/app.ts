import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

export default app;
