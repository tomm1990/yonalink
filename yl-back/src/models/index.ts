import sequelize from '../config/database';  
import Expense from './Expense';
import Category from './Category';
import setupAssociations from './associations';

export const initDb = async () => {
    try {
        setupAssociations();
        await sequelize.sync({ force: false });

        console.log('✅ Database & tables created (if not exist)');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
};

export { sequelize, Expense, Category };
