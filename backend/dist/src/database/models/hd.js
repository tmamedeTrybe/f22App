"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Hd extends sequelize_1.Model {
}
Hd.init({
    id: { type: sequelize_1.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.STRING },
    label: { type: sequelize_1.STRING, allowNull: false },
    capacity: { type: sequelize_1.INTEGER, allowNull: false },
    used: { type: sequelize_1.INTEGER, allowNull: false },
    available: { type: sequelize_1.INTEGER, allowNull: false },
}, {
    sequelize: _1.default,
    modelName: 'hds',
    timestamps: false,
    tableName: 'hds',
});
exports.default = Hd;
