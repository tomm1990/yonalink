import express, { Application } from 'express';
import dotenv from 'dotenv';
import { initDb } from './models';
import expenseRoutes from './routes/expenseRoutes';

dotenv.config();

const config = {
	port: process.env.PORT || 3000,
};

(async () => {
    await initDb();  // ✅ Creates tables if they don’t exist
})();

// TODO add API versioning
// TODO add middleware for authorization

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', expenseRoutes);

app.listen(config.port, () => console.log(`Server running on http://localhost:` + config.port));
