import { knex } from 'knex';
import config from '../config/knexfile';

const environment = (process.env.NODE_ENV || 'development') as 'development' | 'production';
const db = knex(config[environment]);

export default db;