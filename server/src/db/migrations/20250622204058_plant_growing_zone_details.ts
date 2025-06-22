import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plant_growing_zone_details', (table) => {
    table.increments('id').primary();
    table.integer('plant_id').unsigned().references('id').inTable('plants').onDelete('CASCADE').index();
    table.integer('growing_zone_id').unsigned().references('id').inTable('growing_zones').onDelete('CASCADE').index();
    table.date('spring_start_indoors');
    table.date('spring_start_outdoors');
    table.date('spring_transplant');
    table.date('fall_start_indoors');
    table.date('fall_start_outdoors');
    table.date('fall_transplant');
    table.date('last_day_to_plant');
    table.boolean('perennial');
    table.integer('green_thumbs');
    table.date('deleted_at');
    table.date('created_at');
    table.date('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plant_growing_zone_details');
}