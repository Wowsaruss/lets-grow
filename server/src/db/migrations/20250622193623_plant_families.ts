import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plant_families', (table) => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.text('description');
    table.dateTime('created_at');
    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plant_families');
}