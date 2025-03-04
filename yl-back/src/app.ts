import express, { Application } from 'express';
import dotenv from 'dotenv';
import { initDb } from './models';
import expenseRoutes from './routes/expenseRoutes';
import categoryRoutes from './routes/categoryRoutes';
import cors from 'cors';

dotenv.config();

const config = {
	port: process.env.PORT || 3000,
};

initDb();

// TODO add API versioning
// TODO add middleware for authorization

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/expenses', expenseRoutes);
app.use('/categories', categoryRoutes);

app.listen(config.port, () => console.log(`Server running on http://localhost:` + config.port));
