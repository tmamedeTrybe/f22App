import { DATEONLY, INTEGER, Model, STRING } from "sequelize";
import family from "../../interfaces/family";
import db from ".";
import Hd from "./hd";

class Family extends Model implements family {
  id?: number;
  data!: string;
  categoria!: string;
  nome!: string;
  contratante!: string;
  imagem?: string | null;
  local!: string;
  primeiroBackupBruto?: number | null;
  primeiroBackupBrutoTamanho?: number;
  segundoBackupBruto? : number | number;
  segundoBackupBrutoTamanho?: number;
  primeiroBackup?: number;
  primeiroBackupTamanho?: number;
  segundoBackup?: number;
  segundoBackupTamanho?: number;
};

Family.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  data: {  type: DATEONLY, allowNull: false},
  categoria: { type: STRING, allowNull: false },
  nome: { type: STRING, allowNull: false },
  contratante: { type: STRING, allowNull: false },
  imagem: { type: STRING },
  local: { type: STRING, allowNull: false },
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
  modelName: 'families',
  timestamps: false,
  underscored: true,
  
});

Family.belongsTo(Hd, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
Hd.hasMany(Family, { foreignKey: 'primeiroBackupBruto', as: 'rawFamilyOne' });

Family.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'rawBackupTwo' });
Hd.hasMany(Family, { foreignKey: 'segundoBackupBruto', as: 'rawFamilyTwo' });

Family.belongsTo(Hd, { foreignKey: 'primeiroBackup', as: 'editBackupOne' });
Hd.hasMany(Family, { foreignKey: 'primeiroBackup', as: 'editFamilyOne' });

Family.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'editBackupTwo' });
Hd.hasMany(Family, { foreignKey: 'segundoBackupBruto', as: 'editFamilyTwo' });

export default Family;