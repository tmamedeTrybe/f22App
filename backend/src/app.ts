import express from 'express';
import User from './database/models/user';

const app = express();

app.use(express.json());

const exibir_usuarios = async () => {
    const usuarios = await User.findAll();
    console.log(usuarios);
    
    return usuarios;
}

app.get('/health', (_req, res) => res.status(200).send('ok'));
app.get('/usuarios', async (_req, res) => {
    const usuarios = await exibir_usuarios();
    res.status(200).json(usuarios)});

export default app;