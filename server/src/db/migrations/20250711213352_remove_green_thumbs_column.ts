import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('plant_growing_zone_details', (table) => {
        table.dropColumn('green_thumbs');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('plant_growing_zone_details', (table) => {
        table.integer('green_thumbs');
    });
}

