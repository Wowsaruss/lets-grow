import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('plants', (table) => {
        table.string('variety');
    });
    // Create a unique index on (common_name, variety)
    await knex.schema.raw(
        'CREATE UNIQUE INDEX plants_common_name_variety_unique ON plants (common_name, variety)'
    );
}

export async function down(knex: Knex): Promise<void> {
    // Drop the unique index first
    await knex.schema.raw(
        'DROP INDEX IF EXISTS plants_common_name_variety_unique'
    );
    // Remove the variety column
    await knex.schema.alterTable('plants', (table) => {
        table.dropColumn('variety');
    });
}

