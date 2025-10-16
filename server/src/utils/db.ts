import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Log pool errors to avoid unhandled exceptions bringing down the process.
pool.on('error', (err: any) => {
  console.error('Unexpected error on idle DB client', err);
});

export default pool;
