import { INTEGER, Model, STRING } from "sequelize";
import wedding from "../../interfaces/wedding";
import db from '.';

class Wedding extends Model implements wedding {
    id?: number;
    data!: string;
    noiva!: string;
    noivo!: string;
    imagem!: string;
    cidade!: string;
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
    imagem: { type: STRING, allowNull: false },
    cidade: { type: STRING, allowNull: false },
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

export default Wedding;
