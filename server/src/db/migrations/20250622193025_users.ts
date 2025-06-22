import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('password_hash').notNullable();
    table.string('auth0_id').unique();
    table.string('email').unique().notNullable();
    table.string('phone').unique().notNullable();
    table.string('username');
    table.string('role');
    table.string('city');
    table.string('state');
    table.string('address_1');
    table.string('address_2');
    table.string('zipcode');
    table.integer('growing_zone_id').unsigned().references('id').inTable('growing_zones').onDelete('CASCADE').index();
    table.boolean('is_active').defaultTo(true);
    table.boolean('barter_enabled').defaultTo(false);
    table.integer('garden_type_id').unsigned().references('id').inTable('garden_types').onDelete('CASCADE').index();
    table.date('deleted_at');
    table.date('created_at');
    table.date('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
} 
