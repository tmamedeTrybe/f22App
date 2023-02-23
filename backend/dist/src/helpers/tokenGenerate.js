"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const tokenGenerate = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
    };
    const token = (0, jsonwebtoken_1.sign)(payload, JWT_PASSWORD, {
        expiresIn: '7d'
    });
    return token;
};
exports.tokenGenerate = tokenGenerate;
