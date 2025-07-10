import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'
import PlantService from '../../services/plants'
import UserPlantService from '../../services/user_plants'
import UserService from '../../services/users'
import { Plant } from '../../types/Plants'
import { User } from '../../types/User'

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
    const [deletingPlantId, setDeletingPlantId] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) return

        const fetchData = async () => {
            setLoading(true)
            try {
                // Get current user from database
                const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
                const dbUser = await UserService.getCurrentUser(token)
                setCurrentUser(dbUser)

                const userPlants = await PlantService.fetchUserPlants(dbUser.id, token)
                setUserPlantDetails(userPlants)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [isAuthenticated, getAccessTokenSilently])

    const handleDeletePlant = async (plantId: string) => {
        if (!currentUser) return

        // Find the plant name for the confirmation dialog
        const plant = userPlantDetails.find(p => p.id === plantId)
        if (!plant) return

        // Ask for confirmation
        const isConfirmed = window.confirm(
            `Are you sure you want to remove "${plant.commonName}" from your garden?`
        )

        if (!isConfirmed) return

        setDeletingPlantId(plantId)
        try {
            const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })

            // Find the user_plant record to get its ID
            const userPlantsRes = await UserPlantService.fetchByUserId(currentUser.id, token)
            const userPlant = userPlantsRes.find(up => up.plantId === plantId)

            if (!userPlant) {
                alert('Plant not found in your garden')
                return
            }

            // Delete the user_plant record
            await UserPlantService.deleteUserPlant(userPlant.id, token)

            // Remove the plant from the local state
            setUserPlantDetails(prev => prev.filter(plant => plant.id !== plantId))

            alert('Plant removed from your garden!')
        } catch (error) {
            console.error('Error deleting plant from garden:', error)
            alert('Failed to remove plant from garden. Please try again.')
        } finally {
            setDeletingPlantId(null)
        }
    }

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
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {userPlantDetails.map((plant) => (
                                <li
                                    key={plant.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px',
                                        margin: '5px 0',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        backgroundColor: '#f9f9f9'
                                    }}
                                >
                                    <span>{plant.commonName}</span>
                                    <button
                                        onClick={() => handleDeletePlant(plant.id)}
                                        disabled={deletingPlantId === plant.id}
                                        style={{
                                            backgroundColor: '#ff4444',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '3px',
                                            cursor: deletingPlantId === plant.id ? 'not-allowed' : 'pointer',
                                            opacity: deletingPlantId === plant.id ? 0.6 : 1
                                        }}
                                    >
                                        {deletingPlantId === plant.id ? 'Removing...' : 'Remove'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </PageWrapper>
    )
}

export default MyGarden 