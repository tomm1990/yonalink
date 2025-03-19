import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface ExpenseAttributes {
    id: number;
    description: string;
    amount: number;
    categoryId?: number | null; // Nullable Foreign Key
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> { }

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> {
    public id!: number;
    public description!: string;
    public amount!: number;
    public categoryId?: number | null;
}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            set(value: string) {
                this.setDataValue('description', value.trim());
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
                isDecimal: true,
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL', // If a Category is deleted, set `categoryId` to NULL
        },
    },
    {
        sequelize,
        modelName: 'Expense',
    }
);

export default Expense;
