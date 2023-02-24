import User from "../database/models/user";
import UserLogin from "../interfaces/userLogin";
import validateLogin from "../validations/validateLogin";
import md5 from 'md5';
import { tokenGenerate } from "../helpers/tokenGenerate";
import validateNewUser from "../validations/validateNewUser";
import newUser from "../interfaces/newUser";


class UserService {
    constructor(private UserModel: typeof User) {}


    public login = async ({ email, password }: UserLogin) => {
        const loginValid = validateLogin({email, password});
        if (loginValid.erro) return { code: loginValid.code, erro: loginValid.erro }

        const userExist: User | null = await this.UserModel.findOne({ where: { email } });
        if (!userExist) return { code: 400, erro: 'Email não cadastrado, criar novo usuário' };
        
        if (userExist.password !== md5(password)) return { code: 400, erro: 'Senha incorreta' };

        const userToken = tokenGenerate(userExist);

        return { code: 200, token: userToken, user: userExist.name  };

    }

    public createUser = async (newUser: newUser) => {
        const { error } = validateNewUser(newUser);
        if (error) return { code: 400, erro: error.message };

        const userExist: User | null = await this.UserModel.findOne({ where: { email: newUser.email } });
        if (userExist) return { code: 400, erro: 'Email já cadastrado' };

        const { password } = newUser;
        const passwordHash = md5(password);
        const userCreated = {
            ...newUser,
            password: passwordHash
        };
        const newUserResult = await this.UserModel.create(userCreated);
        const token = tokenGenerate(newUserResult);

        return { code: 200, token: token, user: newUser.name }
    };
};

export default UserService;