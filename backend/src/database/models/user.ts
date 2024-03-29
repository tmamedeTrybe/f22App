import { INTEGER, Model, STRING } from "sequelize";
import db from '.';

class User extends Model {
    id?: number;
    name?: string;
    role?: string;
    email?: string;
    password?: string;
};

User.init({
    id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    role: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false },
},
{
    sequelize: db,
    modelName: 'users',
    timestamps: false,
});

export default User;