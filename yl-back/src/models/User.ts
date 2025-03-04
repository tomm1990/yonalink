import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; 
import Category from './Category';
import Expense from './Expense';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
}

// User.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//     },
//     {
//         sequelize,
//         modelName: 'User',
//     }
// );

// User.hasMany(Category, { foreignKey: 'userId', onDelete: 'CASCADE' });
// User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: true });

export default User;
