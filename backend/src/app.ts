import express from 'express';
import { Request, Response } from 'express';
import { userRoutes, weddingRoutes } from './routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (_req: Request, res: Response) => res.status(200).send('ok'));
app.use(userRoutes);
app.use(weddingRoutes);


export default app;