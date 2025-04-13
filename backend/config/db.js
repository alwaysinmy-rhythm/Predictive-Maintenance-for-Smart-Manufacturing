import pkg from 'pg';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

const { Pool } = pkg;

// Create a new pool instance using the connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://mechinsight_owner:npg_OR2Lpiv7syKj@ep-tiny-wave-a5xfydfa-pooler.us-east-2.aws.neon.tech/mechinsight?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.connect()
  .then(() => {
    console.log('PostgreSQL database connected successfully');
  })
  .catch((error) => {
    console.error('PostgreSQL connection error:', error);
  });

// Export the pool to be used in other files
export default pool;