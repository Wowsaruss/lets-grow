import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('green_thumbs', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('plant_growing_zone_detail_id').unsigned().notNullable().references('id').inTable('plant_growing_zone_details').onDelete('CASCADE');
        table.boolean('up').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.unique(['user_id', 'plant_growing_zone_detail_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('green_thumbs');
}

