import Expense from './Expense';
import Category from './Category';

export default function setupAssociations() {
    Category.hasMany(Expense, { foreignKey: 'categoryId', as: 'expenses' });
    Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
}
