import api from './api'

class UserService {
    static async getCurrentUser(token: string) {
        try {
            const response = await api.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        } catch (error) {
            console.error('Error fetching user:', error)
            throw error
        }
    }
}

export default UserService 