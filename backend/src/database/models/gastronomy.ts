import { DATEONLY, INTEGER, Model, STRING } from "sequelize";
import gastronomy from "../../interfaces/gastronomy";
import Corporate from "./corporate";
import db from ".";
import Hd from '../models/hd';

class Gastronomy extends Model implements gastronomy {
  id?: number;
  date!: string;
  company!: string;
  event!: string;
  contact!: string;
  venue!: string;
  city!: string;
  image?: string | null;
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
  date: { type: DATEONLY, allowNull: false },
  company: { type: STRING, allowNull: false },
  event: { type: STRING, allowNull: false },
  contact: { type: STRING, allowNull: false },
  venue: { type: STRING, allowNull: false },
  city: { type: STRING, allowNull: false },
  image: { type: STRING },
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
  modelName: 'gastronomies',
  timestamps: false,
  underscored: true,
});

Gastronomy.belongsTo(Hd, { foreignKey: 'primeiroBackupBruto', as: 'rawBackupOne' });
Hd.hasMany(Gastronomy, { foreignKey: 'primeiroBackupBruto', as: 'rawGastronomyOne' });

Gastronomy.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'rawBackupTwo' });
Hd.hasMany(Gastronomy, { foreignKey: 'segundoBackupBruto', as: 'rawGastronomyTwo' });

Gastronomy.belongsTo(Hd, { foreignKey: 'primeiroBackup', as: 'editBackupOne' });
Hd.hasMany(Gastronomy, { foreignKey: 'primeiroBackup', as: 'editGastronomyOne' });

Gastronomy.belongsTo(Hd, { foreignKey: 'segundoBackupBruto', as: 'editBackupTwo' });
Hd.hasMany(Gastronomy, { foreignKey: 'segundoBackupBruto', as: 'editGastronomyTwo' });

export default Gastronomy;

