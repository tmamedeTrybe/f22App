"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const corporate_1 = __importDefault(require("./corporate"));
const _1 = __importDefault(require("."));
const hd_1 = __importDefault(require("../models/hd"));
class Gastronomy extends sequelize_1.Model {
}
corporate_1.default.init({
    id: { type: sequelize_1.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    date: { type: sequelize_1.DATEONLY, allowNull: false },
    company: { type: sequelize_1.STRING, allowNull: false },
    event: { type: sequelize_1.STRING, allowNull: false },
    contact: { type: sequelize_1.STRING, allowNull: false },
    venue: { type: sequelize_1.STRING, allowNull: false },
    city: { type: sequelize_1.STRING, allowNull: false },
    image: { type: sequelize_1.STRING },
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
    modelName: 'gastronomies',
    timestamps: false,
    underscored: true,
});
Gastronomy.belongsTo(hd_1.default, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
hd_1.default.hasMany(Gastronomy, { foreignKey: 'primeiroBackupBruto', as: 'rawGastronomyOne' });
Gastronomy.belongsTo(hd_1.default, { foreignKey: 'segundoBackupBruto', as: 'rawBackupTwo' });
hd_1.default.hasMany(Gastronomy, { foreignKey: 'segundoBackupBruto', as: 'rawGastronomyTwo' });
Gastronomy.belongsTo(hd_1.default, { foreignKey: 'primeiroBackup', as: 'editBackupOne' });
hd_1.default.hasMany(Gastronomy, { foreignKey: 'primeiroBackup', as: 'editGastronomyOne' });
Gastronomy.belongsTo(hd_1.default, { foreignKey: 'segundoBackupBruto', as: 'editBackupTwo' });
hd_1.default.hasMany(Gastronomy, { foreignKey: 'segundoBackupBruto', as: 'editGastronomyTwo' });
exports.default = Gastronomy;
