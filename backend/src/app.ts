import express from 'express';
import { Request, Response } from 'express';
import { familyRoutes, hdRoutes, userRoutes, weddingRoutes, corporateRoutes, gastronomyRoutes } from './routes';
import cors from 'cors';
import middlewareErro from './middlewares/middlewareErro';


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (_req: Request, res: Response) => res.status(200).send('ok'));
app.use(middlewareErro);
app.use(userRoutes);
app.use(weddingRoutes);
app.use(hdRoutes);
app.use(familyRoutes);
app.use(corporateRoutes);
app.use(gastronomyRoutes)

export default app;