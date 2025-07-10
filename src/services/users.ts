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
            console.log(error)
        }
    }
}

export default UserService 