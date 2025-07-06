import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../config'

export const useAuthToken = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getToken = async () => {
        try {
            console.log(config);
            const token = await getAccessTokenSilently({ audience: config.auth0.audience })
            console.log('Got token:', token ? 'Token received' : 'No token');
            return token
        } catch (error) {
            console.error('Error getting token:', error)
            return null
        }
    }

    return { getToken }
} 