import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserService from '../services/users'
import { config } from '../config'
import { User } from '../shared/types/User'

export const useProfileCompletion = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false)
            return
        }

        const checkProfileCompletion = async () => {
            setLoading(true)
            try {
                const token = await getAccessTokenSilently({ audience: config.auth0.audience })
                const dbUser = await UserService.getCurrentUser(token)

                // Check if user has completed their profile
                if (!dbUser) {
                    // User exists in Auth0 but not in our database - redirect to complete profile
                    navigate('/register')
                    return
                }

                setCurrentUser(dbUser)
            } catch (error: any) {
                console.error('Error checking profile completion:', error)
                // If user not found in database, redirect to complete profile
                if (error?.response?.status === 404) {
                    navigate('/register')
                    return
                }
            } finally {
                setLoading(false)
            }
        }

        checkProfileCompletion()
    }, [isAuthenticated, getAccessTokenSilently, navigate])

    return { currentUser, loading }
} 