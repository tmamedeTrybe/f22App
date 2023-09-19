"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const hd_1 = __importDefault(require("../models/hd"));
class Corporate extends sequelize_1.Model {
}
Corporate.init({
    id: { type: sequelize_1.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    data: { type: sequelize_1.DATEONLY, allowNull: false },
    empresa: { type: sequelize_1.STRING, allowNull: false },
    evento: { type: sequelize_1.STRING, allowNull: false },
    contratante: { type: sequelize_1.STRING, allowNull: false },
    local: { type: sequelize_1.STRING, allowNull: false },
    cidade: { type: sequelize_1.STRING, allowNull: false },
    imagem: { type: sequelize_1.STRING },
    primeiroBackupBruto: { type: sequelize_1.INTEGER, field: 'primeiro_backup_bruto' },
    primeiroBackupBrutoTamanho: { type: sequelize_1.INTEGER, field: 'primeiro_backup_bruto_tamanho', defaultValue: 0, allowNull: false },
    segundoBackupBruto: { type: sequelize_1.INTEGER, field: 'segundo_backup_bruto' },
    segundoBackupBrutoTamanho: { type: sequelize_1.INTEGER, field: 'segundo_backup_bruto_tamanho', defaultValue: 0, allowNull: false },
    primeiroBackup: { type: sequelize_1.INTEGER, field: 'primeiro_backup' },
    primeiroBackupTamanho: { type: sequelize_1.INTEGER, field: 'primeiro_backup_tamanho', defaultValue: 0, allowNull: false },
    segundoBackup: { type: sequelize_1.INTEGER, field: 'segundo_backup' },
    segundoBackupTamanho: { type: sequelize_1.INTEGER, field: 'segundo_backup_tamanho', defaultValue: 0, allowNull: false },
}, {
    sequelize: _1.default,
    modelName: 'corporates',
    timestamps: false,
    underscored: true,
});
Corporate.belongsTo(hd_1.default, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
hd_1.default.hasMany(Corporate, { foreignKey: 'primeiroBackupBruto', as: 'rawCorporateOne' });
Corporate.belongsTo(hd_1.default, { foreignKey: 'segundoBackupBruto', as: 'rawBackupTwo' });
hd_1.default.hasMany(Corporate, { foreignKey: 'segundoBackupBruto', as: 'rawCorporateTwo' });
Corporate.belongsTo(hd_1.default, { foreignKey: 'primeiroBackup', as: 'editBackupOne' });
hd_1.default.hasMany(Corporate, { foreignKey: 'primeiroBackup', as: 'editCorporateOne' });
Corporate.belongsTo(hd_1.default, { foreignKey: 'segundoBackupBruto', as: 'editBackupTwo' });
hd_1.default.hasMany(Corporate, { foreignKey: 'segundoBackupBruto', as: 'editCorporateTwo' });
exports.default = Corporate;
