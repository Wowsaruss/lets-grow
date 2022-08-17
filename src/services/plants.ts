import axios from 'axios'
import { Plant } from '../types/Plants'
import config from '../config'

const apiClient = axios.create({
    baseURL: config.backendApiUrl,
    headers: {
        'Content-type': 'application/json',
    },
})

const fetchAll = async () => {
    const response = await apiClient.get<Plant[]>('/plants')
    return response.data
}

const fetchOne = async (plantId: string | number) => {
    const response = await apiClient.get<Plant>(`/plants/${plantId}`)
    return response.data
}

const updateOne = async (plantId: string | number, body: any) => {
    const response = await apiClient.patch<Plant>(`/plants/${plantId}/edit`, body)
    return response.data
}

const PlantService = { fetchAll, fetchOne, updateOne }

export default PlantService
