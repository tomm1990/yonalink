import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CategoryAttributes {
    id: number;
    name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
    public id!: number;
    public name!: string;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
            set(value: string) {
                this.setDataValue('name', value.trim().toLowerCase());
            },
        },
    },
    {
        sequelize,
        modelName: 'Category',
    }
);

export default Category;
