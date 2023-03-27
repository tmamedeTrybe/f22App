"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const hd_1 = __importDefault(require("./hd"));
class Wedding extends sequelize_1.Model {
}
Wedding.init({
    id: { type: sequelize_1.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    data: { type: sequelize_1.STRING, allowNull: false },
    noiva: { type: sequelize_1.STRING, allowNull: false },
    noivo: { type: sequelize_1.STRING, allowNull: false },
    imagem: { type: sequelize_1.STRING, allowNull: false },
    cidade: { type: sequelize_1.STRING, allowNull: false },
    localCerimonia: { type: sequelize_1.STRING, field: 'local_cerimonia' },
    localRecepcao: { type: sequelize_1.STRING, field: 'local_recepcao' },
    primeiroBackupBruto: { type: sequelize_1.INTEGER, allowNull: false, field: 'primeiro_backup_bruto' },
    primeiroBackupBrutoTamanho: { type: sequelize_1.INTEGER, field: 'primeiro_backup_bruto_tamanho' },
    segundoBackupBruto: { type: sequelize_1.INTEGER, field: 'segundo_backup_bruto' },
    segundoBackupBrutoTamanho: { type: sequelize_1.INTEGER, field: 'segundo_backup_bruto_tamanho' },
    primeiroBackup: { type: sequelize_1.INTEGER, field: 'primeiro_backup' },
    primeiroBackupTamanho: { type: sequelize_1.INTEGER, field: 'primeiro_backup_tamanho' },
    segundoBackup: { type: sequelize_1.INTEGER, field: 'segundo_backup' },
    segundoBackupTamanho: { type: sequelize_1.INTEGER, field: 'segundo_backup_tamanho' },
}, {
    sequelize: _1.default,
    modelName: 'weddings',
    timestamps: false,
    underscored: true,
});
Wedding.belongsTo(hd_1.default, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
hd_1.default.hasMany(Wedding, { foreignKey: 'primeiroBackupBruto', as: 'rawWeddings' });
// Wedding.belongsTo(Hd, { foreignKey: 'primeiroBackupBruto', as: 'backup' });
// Hd.hasMany(Wedding, { foreignKey: 'primeiro_backup_bruto', as: 'weddings' });
exports.default = Wedding;
