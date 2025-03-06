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
        logging: false
    }
);

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

/**
 * Ensures the application retries the database connection if MySQL is not yet ready.
 * 
 * This approach is necessary because Docker Compose v3.3 does not support 
 * the `depends_on` condition with `service_healthy`, meaning that our application 
 * may start before MySQL is fully initialized.
 * 
 * Instead of failing immediately, this function implements a retry mechanism 
 * that waits and attempts to reconnect multiple times before giving up.
 */
export const connectWithRetry = async (attempt = 1): Promise<void> => {
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

export default sequelize;
