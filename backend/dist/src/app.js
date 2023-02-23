"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
// import User from './database/models/user';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (_req, res) => res.status(200).send('ok'));
app.use(routes_1.userRoutes);
exports.default = app;
