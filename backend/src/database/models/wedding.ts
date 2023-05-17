import { DATEONLY, INTEGER, JSON, Model, STRING } from 'sequelize';
import wedding from '../../interfaces/wedding';
import db from '.';
import Hd from './hd';

class Wedding extends Model implements wedding {
    id?: number;
    data!: string;
    noiva!: string;
    noivo!: string;
    cidade!: string;
    imagem?: string;
    localCerimonia?: string;
    localRecepcao?: string;
    primeiroBackupBruto?: number | null;
    primeiroBackupBrutoTamanho?: number;
    segundoBackupBruto?: number;
    segundoBackupBrutoTamanho?: number;
    primeiroBackup?: number;
    primeiroBackupTamanho?: number;
    segundoBackup?: number;
    segundoBackupTamanho?: number;
};

Wedding.init({
    id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    data: { type: DATEONLY, allowNull: false },
    noiva: { type: STRING, allowNull: false },
    noivo: { type: STRING, allowNull: false },
    cidade: { type: STRING, allowNull: false },
    imagem: { type: STRING },
    localCerimonia:{ type: STRING, field: 'local_cerimonia' },
    localRecepcao: { type: STRING, field: 'local_recepcao' },
    primeiroBackupBruto: { type: INTEGER, field: 'primeiro_backup_bruto' },
    primeiroBackupBrutoTamanho: { type: INTEGER, field: 'primeiro_backup_bruto_tamanho', defaultValue: 0, allowNull: false },
    segundoBackupBruto: { type: INTEGER, field: 'segundo_backup_bruto' },
    segundoBackupBrutoTamanho: { type: INTEGER, field: 'segundo_backup_bruto_tamanho', defaultValue: 0, allowNull: false },
    primeiroBackup: { type: INTEGER, field: 'primeiro_backup' },
    primeiroBackupTamanho: { type: INTEGER, field: 'primeiro_backup_tamanho', defaultValue: 0, allowNull: false },
    segundoBackup: { type: INTEGER, field: 'segundo_backup' },
    segundoBackupTamanho: { type: INTEGER, field: 'segundo_backup_tamanho', defaultValue: 0, allowNull: false },
},
{
    sequelize: db,
    modelName: 'weddings',
    timestamps: false,
    underscored: true,
});

Wedding.belongsTo(Hd, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
Hd.hasMany(Wedding, { foreignKey: 'primeiroBackupBruto', as: 'rawWeddingsOne' });

Wedding.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'rawBackupTwo' });
Hd.hasMany(Wedding, { foreignKey: 'segundoBackupBruto', as: 'rawWeddingsTwo' });

Wedding.belongsTo(Hd, { foreignKey: 'primeiroBackup', as: 'editBackupOne' });
Hd.hasMany(Wedding, { foreignKey: 'primeiroBackup', as: 'editWeddingsOne' });

Wedding.belongsTo(Hd, { foreignKey: 'segundoBackup', as: 'editBackupTwo' });
Hd.hasMany(Wedding, { foreignKey: 'segundoBackup', as: 'editWeddingsTwo' });

export default Wedding;
