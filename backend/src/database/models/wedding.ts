import { INTEGER, Model, STRING } from "sequelize";
import wedding from "../../interfaces/wedding";
import db from '.';
import Hd from "./hd";

class Wedding extends Model implements wedding {
    id?: number;
    data!: string;
    noiva!: string;
    noivo!: string;
    cidade!: string;
    imagem?: string;
    localCerimonia?: string;
    localRecepcao?: string;
    primeiroBackupBruto?: number;
    segundoBackupBruto?: number;
    primeiroBackup?: number;
    segundoBackup?: number;
}

Wedding.init({
    id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    data: { type: STRING, allowNull: false },
    noiva: { type: STRING, allowNull: false },
    noivo: { type: STRING, allowNull: false },
    cidade: { type: STRING, allowNull: false },
    imagem: { type: STRING },
    localCerimonia:{ type: STRING, field: 'local_cerimonia' },
    localRecepcao: { type: STRING, field: 'local_recepcao' },
    primeiroBackupBruto: { type: INTEGER, field: 'primeiro_backup_bruto' },
    primeiroBackupBrutoTamanho: { type: INTEGER, field: 'primeiro_backup_bruto_tamanho' },
    segundoBackupBruto: { type: INTEGER, field: 'segundo_backup_bruto' },
    segundoBackupBrutoTamanho: { type: INTEGER, field: 'segundo_backup_bruto_tamanho' },
    primeiroBackup: { type: INTEGER, field: 'primeiro_backup' },
    primeiroBackupTamanho: { type: INTEGER, field: 'primeiro_backup_tamanho' },
    segundoBackup: { type: INTEGER, field: 'segundo_backup' },
    segundoBackupTamanho: { type: INTEGER, field: 'segundo_backup_tamanho' },
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
