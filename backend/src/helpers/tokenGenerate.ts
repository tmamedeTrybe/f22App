import { sign } from 'jsonwebtoken';
import User from '../database/models/user';


const JWT_PASSWORD = process.env.JWT_PASSWORD;

const tokenGenerate = (user: User) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
    }

    const token = sign(payload, JWT_PASSWORD as string, {
        expiresIn: '7d'
    });

    return token;

}

export { tokenGenerate };