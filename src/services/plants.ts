import axios from 'axios'
import { Plant } from '../shared/types/Plants'
import config from '../config'

const apiClient = axios.create({
    baseURL: config.backendApiUrl,
    headers: {
        'Content-type': 'application/json',
    },
})

const fetchAll = async () => {
    const response = await apiClient.get<Plant[]>('/api/plants')
    return response.data
}

const fetchOne = async (plantId: string | number) => {
    const response = await apiClient.get<Plant>(`/api/plants/${plantId}`)
    return response.data
}

const fetchUserPlants = async (userId: string | number, token: string): Promise<Plant[]> => {
    const response = await apiClient.get<Plant[]>(`/api/plants/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const updateOne = async (plantId: string | number, body: any, token: string) => {
    const response = await apiClient.put<Plant>(
        `/api/plants/${plantId}`,
        body,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    return response.data
}

const createOne = async (body: any, token: string) => {
    const response = await apiClient.post<Plant>(`/api/plants`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const deleteOne = async (plantId: string | number, token: string) => {
    return apiClient.delete<Plant>(`/api/plants/${plantId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

const greenThumb = async (plantId: string | number, up: boolean, token: string) => {
    const response = await apiClient.post(`/api/plants/green-thumb/${plantId}`, { up }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const fetchGreenThumbs = async (token: string) => {
    const response = await apiClient.get('/api/plants/green-thumbs', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const PlantService = { fetchAll, fetchOne, fetchUserPlants, updateOne, createOne, deleteOne, greenThumb, fetchGreenThumbs }

export default PlantService
