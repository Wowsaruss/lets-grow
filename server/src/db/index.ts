import { knex } from 'knex';
import config from '../config/knexfile';
import { OpenAI } from 'openai';

const environment = (process.env.NODE_ENV || 'development') as 'development' | 'production';
const db = knex(config[environment]);

// Setup OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Add a real AI helper using OpenAI
const ai = {
    async generatePlantData(commonName: string, variety: string) {
        // Use OpenAI to generate plant data
        const prompt = `You are a gardening expert. Given the plant name and variety, generate a JSON object with all the following fields for a plant database: scientific_name, description, plant_family_name (string), plant_type_name (string), days_to_germination (number), days_to_harvest (number), indeterminate (boolean), germination_temp_high (number)(fehrenheit), germination_temp_low (number)(fehrenheit), light (string), water (string), soil (string), perennial (boolean), heirloom (boolean), hybrid (boolean), open_pollinated (boolean), self_pollinated (boolean), spacing (number)(inches), row_spacing (number)(inches), pruning (string), sowing_depth (number)(inches). Use realistic values. Example input: Tomato, Brandywine. Output only the JSON object.`;
        const userPrompt = `Plant: ${commonName}, Variety: ${variety}`;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            max_tokens: 512,
        });
        const aiData = JSON.parse(completion.choices[0].message.content || '{}');
        return {
            common_name: commonName,
            variety,
            ...aiData,
            created_at: new Date(),
            updated_at: new Date(),
        };
    },
    async generateZoneDetails(commonName: string, variety: string, zone: string) {
        // Use OpenAI to generate growing zone details
        const prompt = `You are a gardening expert. Given a plant name, variety, and USDA growing zone, generate a JSON object for a plant_growing_zone_details table with these fields: spring_start_indoors (YYYY-MM-DD), spring_start_outdoors (YYYY-MM-DD), spring_transplant (YYYY-MM-DD), fall_start_indoors (YYYY-MM-DD), fall_start_outdoors (YYYY-MM-DD), fall_transplant (YYYY-MM-DD), last_day_to_plant (YYYY-MM-DD), perennial (boolean). Use realistic values for the given zone. Output only the JSON object.`;
        const userPrompt = `Plant: ${commonName}, Variety: ${variety}, Zone: ${zone}`;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            max_tokens: 512,
        });
        const aiData = JSON.parse(completion.choices[0].message.content || '{}');
        return {
            ...aiData,
            green_thumbs: 0,
            deleted_at: null,
        };
    },
};

export default Object.assign(db, { ai });