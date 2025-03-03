import sequelize from '../config/database';  
import Expense from './Expense';

export const initDb = async () => {
    try {
        await sequelize.sync({ force: false });

        console.log('✅ Database & tables created (if not exist)');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
};

export { sequelize, Expense };
