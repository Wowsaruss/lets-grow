import axios from "axios";
import db from "../db";

export const fetchGrowingZoneId = async (zipcode: string) => {
    try {
        const { data } = await axios.get(`https://phzmapi.org/${zipcode}.json`)

        const growingZoneId = await db('growing_zones')
            .select('id', "zone")
            .where('zone', data?.zone);

        return growingZoneId.length ? growingZoneId[0].id : null
    } catch (e) {
        return null
    }
}