import { User } from '../../types/User'
import api from './api'

class UserService {
    static async getCurrentUser(): Promise<User> {
        const response = await api.get('/users/me')
        return response.data
    }
}

export default UserService 