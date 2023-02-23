"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const user_1 = __importDefault(require("../database/models/user"));
const UserService_1 = __importDefault(require("../services/UserService"));
const userRoutes = (0, express_1.Router)();
const usercontroller = new UserController_1.default(new UserService_1.default(user_1.default));
userRoutes.get('/login', usercontroller.login);
exports.default = userRoutes;
