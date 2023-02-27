"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateSearchByDate = (valueSearch) => {
    if (valueSearch instanceof Date)
        return { code: 400, erro: 'Formato de data deve ser YYYYMMDD' };
    return { code: 200 };
};
exports.default = validateSearchByDate;
