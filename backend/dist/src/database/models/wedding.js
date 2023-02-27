"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Wedding extends sequelize_1.Model {
}
Wedding.init({
    id: { type: sequelize_1.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    data: { type: sequelize_1.DATE, allowNull: false },
    noiva: { type: sequelize_1.STRING, allowNull: false },
    noivo: { type: sequelize_1.STRING, allowNull: false },
    imagem: { type: sequelize_1.STRING, allowNull: false },
    cidade: { type: sequelize_1.STRING, allowNull: false },
    localCerimonia: { type: sequelize_1.STRING, field: 'local_cerimonia' },
    localRecepcao: { type: sequelize_1.STRING, field: 'local_recepcao' },
    primeiroBackupBruto: { type: sequelize_1.INTEGER, field: 'primeiro_backup_bruto' },
    segundoBackupBruto: { type: sequelize_1.INTEGER, field: 'segundo_backup_bruto' },
    primeiroBackup: { type: sequelize_1.INTEGER, field: 'primeiro_backup' },
    segundoBackup: { type: sequelize_1.INTEGER, field: 'segundo_backup' },
}, {
    sequelize: _1.default,
    modelName: 'weddings',
    timestamps: false,
    underscored: true,
});
exports.default = Wedding;
