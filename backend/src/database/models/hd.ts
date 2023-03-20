import { INTEGER, Model, STRING } from "sequelize";
import hd from "../../interfaces/hd";
import db from '.';

class Hd extends Model implements hd {
	id?:number;
	name!: string;
	label!: string;
	capacity!: number;
	used!: number;
	available!: number;
}

Hd.init({
	id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement:true },
	name: { type:STRING, allowNull: false },
	label: { type:STRING, allowNull: false },
	capacity: { type:INTEGER, allowNull: false },
	used: { type:INTEGER, allowNull: false },
	available: { type:INTEGER, allowNull: false },
},{
	sequelize: db,
	modelName: 'hds',
	timestamps: false,
});

export default Hd;