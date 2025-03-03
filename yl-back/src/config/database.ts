import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: 'mysql',
        port: Number(process.env.DB_PORT),
    }
);

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

async function connectWithRetry(attempt = 1): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to MySQL successfully!");
    } catch (error: any) {
        console.error(`❌ Attempt ${attempt}: Error connecting to MySQL -`, error.message);
        
        if (attempt < MAX_RETRIES) {
            console.log(`🔄 Retrying in ${RETRY_DELAY / 1000} seconds... (${attempt}/${MAX_RETRIES})`);
            await new Promise(res => setTimeout(res, RETRY_DELAY));
            return connectWithRetry(attempt + 1);
        } else {
            console.error("🚨 Max retries reached. Could not connect to MySQL.");
            process.exit(1); // Exit process if all retries fail
        }
    }
}

// Start connection attempts
connectWithRetry();

export default sequelize;
