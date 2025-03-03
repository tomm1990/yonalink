import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ExpenseAttributes {
    id: number;
    description: string;
    amount: number;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> { }

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> {
    public id!: number;
    public description!: string;
    public amount!: number;
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

    },
    {
        sequelize,
        modelName: 'Expense',
    }
);

export default Expense;
