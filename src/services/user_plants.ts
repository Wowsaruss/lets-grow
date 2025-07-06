import api from './api'

interface UserPlant {
    id: string
    userId: string
    plantId: string
    createdAt: string
    updatedAt: string
}

const fetchByUserId = async (userId: string | number, token: string): Promise<UserPlant[]> => {
    const response = await api.get(`/user-plants?user_id=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const addPlantToUser = async (data: { userId: string | number; plantId: string }, token: string): Promise<UserPlant> => {
    const response = await api.post('/user_plants', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const updateUserPlant = async (id: string, data: Partial<UserPlant>, token: string): Promise<UserPlant> => {
    const response = await api.put(`/user_plants/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

const deleteUserPlant = async (id: string, token: string): Promise<void> => {
    await api.delete(`/user_plants/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

const UserPlantService = {
    fetchByUserId,
    addPlantToUser,
    updateUserPlant,
    deleteUserPlant,
}

export default UserPlantService 