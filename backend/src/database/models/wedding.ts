import { DATE, INTEGER, Model, STRING } from "sequelize";
import wedding from "../../interfaces/wedding";
import db from '.';

class Wedding extends Model implements wedding {
    id?: number;
    data!: Date;
    noiva!: string;
    noivo!: string;
    imagem?: string;
    cidade?: string;
    localCerimonia?: string;
    localRecepcao?: string;
    primeiroBackupBruto?: number;
    segundoBackupBruto?: number;
    primeiroBackup?: number;
    segundoBackup?: number;
}

Wedding.init({
    id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    data: { type: DATE, allowNull: false },
    noiva: { type: STRING, allowNull: false },
    noivo: { type: STRING, allowNull: false },
    imagem: { type: STRING, allowNull: false },
    cidade: { type: STRING, allowNull: false },
    localCerimonia:{ type: STRING, field: 'local_cerimonia' },
    localRecepcao: { type: STRING, field: 'local_recepcao' },
    primeiroBackupBruto: { type: INTEGER, field: 'primeiro_backup_bruto' },
    segundoBackupBruto: { type: INTEGER, field: 'segundo_backup_bruto' },
    primeiroBackup: { type: INTEGER, field: 'primeiro_backup' },
    segundoBackup: { type: INTEGER, field: 'segundo_backup' },
},
{
    sequelize: db,
    modelName: 'weddings',
    timestamps: false,
    underscored: true,
});

export default Wedding;
