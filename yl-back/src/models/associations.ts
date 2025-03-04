import Expense from './Expense';
import Category from './Category';

Category.hasMany(Expense, { foreignKey: 'categoryId', as: 'expenses' });
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default function setupAssociations() {
    console.log('Associations have been set up.');
}
