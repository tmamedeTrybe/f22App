import { Request, Response } from 'express';
import User from "../database/models/user";
import UserService from "../services/UserService";

class UserController {
    constructor(private userService = new UserService(User)) {}

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userLogged = await this.userService.login({ email, password });

        console.log(userLogged);
        

        if (userLogged.erro) return res.status(userLogged.code).json({ erro: userLogged.erro } );

        return res.status(userLogged.code).json({ user:{ name: userLogged.user, token: userLogged.token } });
    }
}

export default UserController;