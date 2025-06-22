import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function createDatabase() {
  const client = new Client({
    database: process.env.DB_NAME || 'lets_grow',
    user: process.env.DB_USER || 'russellhayes',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
  });

  try {
    await client.connect();
    const dbName = process.env.DB_NAME || 'lets_grow_dev';
    
    // Check if database exists
    const checkDb = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (checkDb.rowCount === 0) {
      // Create database
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

createDatabase(); 