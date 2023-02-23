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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./database/models/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const exibir_usuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield user_1.default.findAll();
    console.log(usuarios);
    return usuarios.length;
});
app.get('/health', (_req, res) => res.status(200).send('ok'));
app.get('/usuarios', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield exibir_usuarios();
    res.status(200).json(usuarios);
}));
exports.default = app;
