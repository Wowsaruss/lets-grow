import { createDatabase } from './create-db';
import knex from 'knex';
import config from '../config/knexfile';

async function migrate() {
  try {
    // First ensure database exists
    await createDatabase();
    
    // Then run migrations
    const db = knex(config.development);
    await db.migrate.latest();
    console.log('Migrations completed successfully');
    await db.destroy();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate(); 