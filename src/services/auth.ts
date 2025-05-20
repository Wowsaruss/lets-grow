import { useAuth0 } from '@auth0/auth0-react'

export const useAuthToken = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getToken = async () => {
        try {
            console.log('Getting access token silently...');
            const token = await getAccessTokenSilently()
            console.log('Got token:', token ? 'Token received' : 'No token');
            localStorage.setItem('auth_token', token)
            return token
        } catch (error) {
            console.error('Error getting token:', error)
            return null
        }
    }

    return { getToken }
}

export const getStoredToken = () => {
    const token = localStorage.getItem('auth_token')
    console.log('Retrieved stored token:', token ? 'Token exists' : 'No token found');
    return token
}

export const clearStoredToken = () => {
    localStorage.removeItem('auth_token')
} 