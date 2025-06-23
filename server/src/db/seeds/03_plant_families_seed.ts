import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('plant_families').del();

    await knex('plant_families').insert([
        { id: 1, name: 'Amaranthaceae', description: 'Amaranth, beet, chard, spinach, quinoa', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'Apiaceae', description: 'Carrot, celery, parsley, parsnip, dill, fennel, cilantro', created_at: new Date(), updated_at: new Date() },
        { id: 3, name: 'Asteraceae', description: 'Lettuce, artichoke, endive, chicory, salsify, sunflower', created_at: new Date(), updated_at: new Date() },
        { id: 4, name: 'Brassicaceae', description: 'Cabbage, broccoli, cauliflower, kale, radish, turnip, mustard, arugula, bok choy, kohlrabi, Brussels sprouts, collards, rutabaga', created_at: new Date(), updated_at: new Date() },
        { id: 5, name: 'Cucurbitaceae', description: 'Cucumber, melon, squash, pumpkin, zucchini, watermelon, gourd', created_at: new Date(), updated_at: new Date() },
        { id: 6, name: 'Fabaceae', description: 'Bean, pea, lentil, chickpea, peanut, soybean, fava bean', created_at: new Date(), updated_at: new Date() },
        { id: 7, name: 'Liliaceae', description: 'Onion, garlic, leek, shallot, chive, asparagus', created_at: new Date(), updated_at: new Date() },
        { id: 8, name: 'Malvaceae', description: 'Okra, cotton', created_at: new Date(), updated_at: new Date() },
        { id: 9, name: 'Poaceae', description: 'Corn, sweet corn, sorghum, millet, wheat, rice, barley, oats', created_at: new Date(), updated_at: new Date() },
        { id: 10, name: 'Polygonaceae', description: 'Rhubarb, buckwheat, sorrel', created_at: new Date(), updated_at: new Date() },
        { id: 11, name: 'Solanaceae', description: 'Tomato, potato, eggplant, pepper, tomatillo, ground cherry', created_at: new Date(), updated_at: new Date() },
        { id: 12, name: 'Chenopodiaceae', description: 'Spinach, beet, chard (now often included in Amaranthaceae)', created_at: new Date(), updated_at: new Date() },
        { id: 13, name: 'Convolvulaceae', description: 'Sweet potato, morning glory', created_at: new Date(), updated_at: new Date() },
        { id: 14, name: 'Cactaceae', description: 'Prickly pear (edible pads and fruits)', created_at: new Date(), updated_at: new Date() },
        { id: 15, name: 'Rosaceae', description: 'Strawberry, apple, pear, peach, plum, cherry, raspberry, blackberry, almond', created_at: new Date(), updated_at: new Date() },
        { id: 16, name: 'Violaceae', description: 'Violet (some edible species)', created_at: new Date(), updated_at: new Date() },
        { id: 17, name: 'Araceae', description: 'Taro, elephant ear', created_at: new Date(), updated_at: new Date() },
        { id: 18, name: 'Dioscoreaceae', description: 'Yam', created_at: new Date(), updated_at: new Date() },
        { id: 19, name: 'Ericaceae', description: 'Blueberry, cranberry', created_at: new Date(), updated_at: new Date() },
        { id: 20, name: 'Lauraceae', description: 'Avocado, bay laurel', created_at: new Date(), updated_at: new Date() },
        { id: 21, name: 'Musaceae', description: 'Banana, plantain', created_at: new Date(), updated_at: new Date() },
        { id: 22, name: 'Passifloraceae', description: 'Passionfruit', created_at: new Date(), updated_at: new Date() },
        { id: 23, name: 'Rutaceae', description: 'Citrus (orange, lemon, lime, grapefruit, etc.)', created_at: new Date(), updated_at: new Date() },
        { id: 24, name: 'Zingiberaceae', description: 'Ginger, turmeric, cardamom', created_at: new Date(), updated_at: new Date() },
        { id: 25, name: 'Euphorbiaceae', description: 'Cassava, rubber tree', created_at: new Date(), updated_at: new Date() },
        { id: 26, name: 'Moraceae', description: 'Fig, breadfruit, mulberry', created_at: new Date(), updated_at: new Date() },
        { id: 27, name: 'Sapindaceae', description: 'Lychee, longan, rambutan', created_at: new Date(), updated_at: new Date() },
        { id: 28, name: 'Arecaceae', description: 'Date palm, coconut, oil palm', created_at: new Date(), updated_at: new Date() },
        { id: 29, name: 'Brassicaceae (Cruciferae)', description: 'Horseradish, watercress, cress', created_at: new Date(), updated_at: new Date() },
        { id: 30, name: 'Alliaceae', description: 'Onion, garlic, leek, chive (sometimes separated from Liliaceae)', created_at: new Date(), updated_at: new Date() },
    ]);
}