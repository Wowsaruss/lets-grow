import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'lets_grow';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

export async function createDatabase() {
  // Connect to the default 'postgres' database
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres',
  });

  try {
    await client.connect();
    // Check if the database exists
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created successfully.`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  createDatabase();
} 