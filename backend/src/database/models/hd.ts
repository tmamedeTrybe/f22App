import { INTEGER, Model, STRING } from "sequelize";
import hd from '../../interfaces/hd';
import db from '.';
import hdWithWedding from '../../interfaces/hdWithWedding';

class Hd extends Model implements hd, hdWithWedding {
	id!:number;
	name?: string;
	label!: string;
	capacity!: number;
	used!: number;
	available!: number;
};

Hd.init({
	id: { type: INTEGER, allowNull: false, autoIncrement:true, primaryKey: true },
	name: { type:STRING },
	label: { type:STRING, allowNull: false },
	capacity: { type:INTEGER, allowNull: false },
	used: { type:INTEGER, allowNull: false },
	available: { type:INTEGER, allowNull: false },
},{
	sequelize: db,
	modelName: 'hds',
	timestamps: false,
	tableName: 'hds',
});

export default Hd;