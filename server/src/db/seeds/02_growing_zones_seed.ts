import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("growing_zones").del();

    // Inserts USDA growing zones with explicit IDs
    await knex("growing_zones").insert([
        {
            id: 1,
            zone: '1a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 2,
            zone: '1b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 3,
            zone: '2a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 4,
            zone: '2b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 5,
            zone: '3a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 6,
            zone: '3b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 7,
            zone: '4a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 8,
            zone: '4b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 9,
            zone: '5a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 10,
            zone: '5b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 11,
            zone: '6a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 12,
            zone: '6b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 13,
            zone: '7a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 14,
            zone: '7b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 15,
            zone: '8a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 16,
            zone: '8b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 17,
            zone: '9a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 18,
            zone: '9b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 19,
            zone: '10a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 20,
            zone: '10b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 21,
            zone: '11a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 22,
            zone: '11b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 23,
            zone: '12a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 24,
            zone: '12b',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 25,
            zone: '13a',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 26,
            zone: '13b',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
};
