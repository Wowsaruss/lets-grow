import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('garden_types').del();

    // Inserts seed entries
    await knex('garden_types').insert([
        {
            id: 1,
            title: 'In-Ground',
            description: 'Traditional garden beds directly in the native soil.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 2,
            title: 'Raised Bed',
            description: 'A garden bed built above ground level, often framed with wood, stone, or other materials.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 3,
            title: 'Container',
            description: 'Gardening in pots, planters, or other containers.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 4,
            title: 'Vertical',
            description: 'Gardens that grow upward using trellises, walls, or stacked containers.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 5,
            title: 'Hydroponic',
            description: 'Soilless gardening using nutrient-rich water solutions.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 6,
            title: 'Aquaponic',
            description: 'Combines aquaculture (raising fish) with hydroponics (growing plants in water).',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 7,
            title: 'Greenhouse',
            description: 'Gardening inside a structure with transparent walls and roof for year-round growing.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 8,
            title: 'Community Garden',
            description: 'A shared space where multiple people or families garden together.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 9,
            title: 'Rooftop',
            description: 'Gardening on the roof of a building, often in urban environments.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 10,
            title: 'Keyhole Garden',
            description: 'A circular raised bed with a notch for easy access and a compost basket in the center.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 11,
            title: 'Permaculture',
            description: 'A garden designed for sustainability and self-sufficiency, often mimicking natural ecosystems.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 12,
            title: 'Square Foot Garden',
            description: 'A method of gardening in raised beds divided into square sections for intensive planting.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 13,
            title: 'No-Dig Garden',
            description: 'A garden bed created by layering organic materials on top of the soil without tilling.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 14,
            title: 'Wildlife Garden',
            description: 'A garden designed to attract and support local wildlife such as birds, bees, and butterflies.',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 15,
            title: 'Other',
            description: 'Not yet specified.',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
}
