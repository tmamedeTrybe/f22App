"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateLogin_1 = __importDefault(require("../validations/validateLogin"));
const md5_1 = __importDefault(require("md5"));
const tokenGenerate_1 = require("../helpers/tokenGenerate");
const validateNewUser_1 = __importDefault(require("../validations/validateNewUser"));
class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.login = ({ email, password }) => __awaiter(this, void 0, void 0, function* () {
            const loginValid = (0, validateLogin_1.default)({ email, password });
            if (loginValid.erro)
                return { code: loginValid.code, erro: loginValid.erro };
            const userExist = yield this.UserModel.findOne({ where: { email } });
            if (!userExist)
                return { code: 400, erro: 'Email não cadastrado, criar novo usuário' };
            if (userExist.password !== (0, md5_1.default)(password))
                return { code: 400, erro: 'Senha incorreta' };
            const userToken = (0, tokenGenerate_1.tokenGenerate)(userExist);
            return { code: 200, token: userToken, user: userExist.name };
        });
        this.createUser = (newUser) => __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateNewUser_1.default)(newUser);
            if (error)
                return { code: 400, erro: error.message };
            const userExist = yield this.UserModel.findOne({ where: { email: newUser.email } });
            if (userExist)
                return { code: 400, erro: 'Email já cadastrado' };
            const { password } = newUser;
            const passwordHash = (0, md5_1.default)(password);
            const userCreated = Object.assign(Object.assign({}, newUser), { password: passwordHash });
            const newUserResult = yield this.UserModel.create(userCreated);
            const token = (0, tokenGenerate_1.tokenGenerate)(newUserResult);
            return { code: 200, token: token, user: newUser.name };
        });
    }
}
;
exports.default = UserService;
