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

const updateOne = async (plantId: string | number, body: any) => {
    const response = await apiClient.patch<Plant>(
        `/api/plants/${plantId}/edit`,
        body
    )
    return response.data
}

const createOne = async (body: any) => {
    const response = await apiClient.post<Plant>(`/api/plants/new`, body)
    return response.data
}

const deleteOne = async (plantId: string | number) => {
    return apiClient.delete<Plant>(`/api/plants/${plantId}/delete`)
}

const PlantService = { fetchAll, fetchOne, fetchUserPlants, updateOne, createOne, deleteOne }

export default PlantService
