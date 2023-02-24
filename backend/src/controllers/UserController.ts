import { Request, Response } from 'express';
import User from "../database/models/user";
import UserService from "../services/UserService";

class UserController {
    constructor(private userService = new UserService(User)) {}

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userLogged = await this.userService.login({ email, password });

        if (userLogged.erro) return res.status(userLogged.code).json({ erro: userLogged.erro } );

        return res.status(userLogged.code).json({ user:{ name: userLogged.user, token: userLogged.token } });
    }

    public createUser = async (req: Request, res: Response) => {
        const userCreated = await this.userService.createUser(req.body);

        if (userCreated.erro) return res.status(userCreated.code).json({ erro: userCreated.erro });

        return res.status(userCreated.code).json({ user: { name: userCreated.user, token: userCreated.token } })
    }
}

export default UserController;