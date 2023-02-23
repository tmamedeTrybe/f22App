"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLogin = ({ email, password }) => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const confereEmail = emailRegex.test(email);
    if (!confereEmail)
        return { code: 400, erro: 'Preencha com um email válido' };
    if (password.length < 6)
        return { code: 400, erro: 'Senha deve ter seis caracteres ou mais' };
    return { code: 200 };
};
exports.default = validateLogin;
