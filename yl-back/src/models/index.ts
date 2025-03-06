import sequelize from '../config/database';  
import Expense from './Expense';
import Category from './Category';
import setupAssociations from './associations';

const seedDatabase = async () => {
    const categories = await Category.findAll();
    if (categories.length === 0) {
        console.log('🌱 Seeding database with default categories and expenses...');

        // Create 10 different categories
        const categoryNames = [
            'Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare',
            'Education', 'Shopping', 'Travel', 'Insurance', 'Miscellaneous'
        ];

        const createdCategories = await Category.bulkCreate(
            categoryNames.map(name => ({ name }))
        );

        // Create 25 different expenses (only 15 have a categoryId)
        const expensesData = [
            { description: 'Grocery shopping', amount: 50, categoryId: createdCategories[0].id },
            { description: 'Bus ticket', amount: 2.5, categoryId: createdCategories[1].id },
            { description: 'Electricity bill', amount: 30, categoryId: createdCategories[2].id },
            { description: 'Netflix subscription', amount: 15, categoryId: createdCategories[3].id },
            { description: 'Doctor visit', amount: 80, categoryId: createdCategories[4].id },
            { description: 'Online course', amount: 100, categoryId: createdCategories[5].id },
            { description: 'New shoes', amount: 60, categoryId: createdCategories[6].id },
            { description: 'Weekend trip', amount: 250, categoryId: createdCategories[7].id },
            { description: 'Car insurance', amount: 120, categoryId: createdCategories[8].id },
            { description: 'Charity donation', amount: 40, categoryId: createdCategories[9].id },
            { description: 'Lunch', amount: 12, categoryId: createdCategories[0].id },
            { description: 'Gas refill', amount: 50, categoryId: createdCategories[1].id },
            { description: 'Water bill', amount: 25, categoryId: createdCategories[2].id },
            { description: 'Movie ticket', amount: 10, categoryId: createdCategories[3].id },
            { description: 'Medication', amount: 15, categoryId: createdCategories[4].id },
            { description: 'Gym membership', amount: 40, categoryId: null },
            { description: 'Freelance project', amount: 300, categoryId: null },
            { description: 'Gift for friend', amount: 70, categoryId: null },
            { description: 'Taxi ride', amount: 20, categoryId: null },
            { description: 'Laptop repair', amount: 150, categoryId: null },
            { description: 'Online subscription', amount: 8, categoryId: null },
            { description: 'Book purchase', amount: 30, categoryId: null },
            { description: 'Dinner out', amount: 50, categoryId: null },
            { description: 'Streaming service', amount: 12, categoryId: null },
            { description: 'Phone bill', amount: 60, categoryId: null }
        ];

        await Expense.bulkCreate(expensesData);
        console.log('✅ Database seeded successfully.');
    }
};

export const initDb = async () => {
    try {
        setupAssociations();
        await sequelize.sync({ alter: true });
        console.log('✅ Database & tables created (if not exist)');
        await seedDatabase();
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
};

export { sequelize, Expense, Category };
