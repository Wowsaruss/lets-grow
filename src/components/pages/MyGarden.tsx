import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'
import PlantService from '../../services/plants'
import UserPlantService from '../../services/user_plants'
import UserService from '../../services/users'
import { Plant } from '../../../types/Plants'
import { User } from '../../../types/User'

interface UserPlant {
    id: string
    userId: string
    plantId: string
    createdAt: string
    updatedAt: string
}

const MyGarden = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [userPlantDetails, setUserPlantDetails] = useState<Plant[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        if (!isAuthenticated) return
        const fetchData = async () => {
            setLoading(true)
            try {
                // Get current user from database
                const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
                const dbUser = await UserService.getCurrentUser(token)
                setCurrentUser(dbUser)

                // Fetch user_plants for the current user using database ID
                const userPlantsRes = await UserPlantService.fetchByUserId(dbUser.id, token)
                console.log(userPlantsRes)

                // Fetch plant details for each user plant
                const plantDetails = await Promise.all(
                    userPlantsRes.map(async (userPlant) => {
                        try {
                            return await PlantService.fetchOne(userPlant.plantId)
                        } catch (error) {
                            console.error(`Error fetching plant ${userPlant.plantId}:`, error)
                            return null
                        }
                    })
                )
                setUserPlantDetails(plantDetails.filter(Boolean) as Plant[])
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [isAuthenticated, getAccessTokenSilently])

    return (
        <PageWrapper header={<PageHeader title="My Garden" />}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2>Your Plants</h2>
                    {userPlantDetails.length === 0 ? (
                        <p>You have not added any plants to your garden yet.</p>
                    ) : (
                        <ul>
                            {userPlantDetails.map((plant) => (
                                <li key={plant.id}>{plant.commonName}</li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </PageWrapper>
    )
}

export default MyGarden 