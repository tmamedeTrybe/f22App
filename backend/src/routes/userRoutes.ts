import { Router } from 'express';
import UserController from '../controllers/UserController';
import User from '../database/models/user';
import UserService from '../services/UserService';

const userRoutes = Router();

const usercontroller = new UserController(new UserService(User));

userRoutes.post('/login', usercontroller.login);
userRoutes.post('/register', usercontroller.createUser);

export default userRoutes;
