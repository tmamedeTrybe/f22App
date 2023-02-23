import User from "../database/models/user";
import UserLogin from "../interfaces/userLogin";
import validateLogin from "../validations/validateLogin";
import md5 from 'md5';
import { tokenGenerate } from "../helpers/tokenGenerate";


class UserService {
    constructor(private UserModel: typeof User) {}


    public login = async ({email, password}: UserLogin) => {
        const loginValid = validateLogin({email, password});
        if (loginValid.erro) return { code: loginValid.code, erro: loginValid.erro }

        const userExist: User | null = await this.UserModel.findOne({ where: { email } });
        if (!userExist) return { code: 400, erro: 'Email não cadastrado, criar novo usuário' };

        console.log(userExist.password, "senha no banco");
        console.log(md5(password), 'senha transformada');
        
        

        if (userExist.password !== md5(password)) return { code: 400, erro: 'Senha incorreta' }

        const userToken = tokenGenerate(userExist);

        return { code: 200, token: userToken, user: userExist.name  }

    }
}

export default UserService;