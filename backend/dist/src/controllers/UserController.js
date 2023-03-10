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
const user_1 = __importDefault(require("../database/models/user"));
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    constructor(userService = new UserService_1.default(user_1.default)) {
        this.userService = userService;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userLogged = yield this.userService.login({ email, password });
            if (userLogged.erro)
                return res.status(userLogged.code).json({ erro: userLogged.erro });
            return res.status(userLogged.code).json({ user: { name: userLogged.user, token: userLogged.token } });
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userCreated = yield this.userService.createUser(req.body);
            if (userCreated.erro)
                return res.status(userCreated.code).json({ erro: userCreated.erro });
            return res.status(userCreated.code).json({ user: { name: userCreated.user, token: userCreated.token } });
        });
    }
}
exports.default = UserController;
