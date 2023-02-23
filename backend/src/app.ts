import express from 'express';
import { Request, Response } from 'express';
import { userRoutes } from './routes';

const app = express();

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => res.status(200).send('ok'));
app.use(userRoutes);


export default app;