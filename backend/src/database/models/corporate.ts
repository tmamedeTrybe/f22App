import { DATEONLY, INTEGER, Model, STRING } from "sequelize";
import corporate from '../../interfaces/corporate';
import db from ".";
import Hd from '../models/hd';

class Corporate extends Model implements corporate {
  id?: number;
  data!: string;
  empresa!: string;
  evento?: string;
  contratante!: string;
  local!: string;
  cidade!: string;
  imagem?: string | null;
  primeiroBackupBruto?: number | null;
  primeiroBackupBrutoTamanho?: number;
  segundoBackupBruto? : number | number;
  segundoBackupBrutoTamanho?: number;
  primeiroBackup?: number;
  primeiroBackupTamanho?: number;
  segundoBackup?: number;
  segundoBackupTamanho?: number;
}

Corporate.init({
  id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  data: { type: DATEONLY, allowNull: false },
  empresa: { type: STRING, allowNull: false },
  evento: { type: STRING, allowNull: false },
  contratante: { type: STRING, allowNull: false },
  local: { type: STRING, allowNull: false },
  cidade: { type: STRING, allowNull: false },
  imagem: { type: STRING },
  primeiroBackupBruto: { type: INTEGER, field: 'primeiro_backup_bruto' },
  primeiroBackupBrutoTamanho: { type: INTEGER, field: 'primeiro_backup_bruto_tamanho', defaultValue: 0, allowNull: false },
  segundoBackupBruto: { type: INTEGER, field: 'segundo_backup_bruto' },
  segundoBackupBrutoTamanho: { type: INTEGER, field: 'segundo_backup_bruto_tamanho', defaultValue: 0, allowNull: false },
  primeiroBackup: { type: INTEGER, field: 'primeiro_backup' },
  primeiroBackupTamanho: { type: INTEGER, field: 'primeiro_backup_tamanho', defaultValue: 0, allowNull: false },
  segundoBackup: { type: INTEGER, field: 'segundo_backup' },
  segundoBackupTamanho: { type: INTEGER, field: 'segundo_backup_tamanho', defaultValue: 0, allowNull: false },
}, {
  sequelize: db,
  modelName: 'corporates',
  timestamps: false,
  underscored: true,
});

Corporate.belongsTo(Hd, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
Hd.hasMany(Corporate, { foreignKey: 'primeiroBackupBruto', as: 'rawCorporateOne' });

Corporate.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'rawBackupTwo' });
Hd.hasMany(Corporate, { foreignKey: 'segundoBackupBruto', as: 'rawCorporateTwo' });

Corporate.belongsTo(Hd, { foreignKey: 'primeiroBackup', as: 'editBackupOne' });
Hd.hasMany(Corporate, { foreignKey: 'primeiroBackup', as: 'editCorporateOne' });

Corporate.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'editBackupTwo' });
Hd.hasMany(Corporate, { foreignKey: 'segundoBackupBruto', as: 'editCorporateTwo' });

export default Corporate;