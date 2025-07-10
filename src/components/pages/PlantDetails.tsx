import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Plant } from '../../types/Plants'
import PlantService from '../../services/plants'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import Loader from '../Loader'
import { useAuth0 } from '@auth0/auth0-react'
import UserService from '../../services/users'
import UserPlantService from '../../services/user_plants'
import Button from '../Button'
import { UserRole } from '../../types/User'

export default function PlantDetails() {
    const params: Record<string, any> = useParams()
    const [plant, setPlant] = useState<Plant | null>(null)
    const [userPlants, setUserPlants] = useState<string[]>([])
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [adding, setAdding] = useState(false)
    const [removing, setRemoving] = useState(false)
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()

    const { isLoading: isLoadingPlant, refetch: getPlant } = useQuery<
        Plant,
        Error
    >(
        'query-plant',
        async () => {
            return await PlantService.fetchOne(params.plantId)
        },
        {
            enabled: false,
            onSuccess: (res: any) => {
                setPlant(res)
            },
            onError: (err: any) => {
                setPlant(err)
            },
        }
    )

    useEffect(() => {
        getPlant()
    }, [getPlant])

    // Fetch user's garden plant IDs
    useEffect(() => {
        const fetchUserPlants = async () => {
            if (!isAuthenticated) return
            try {
                const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
                const dbUser = await UserService.getCurrentUser(token)
                setCurrentUser(dbUser)
                const userPlantsRes = await UserPlantService.fetchByUserId(dbUser.id, token)
                setUserPlants(userPlantsRes.map(up => up.plantId))
            } catch (error) {
                setUserPlants([])
            }
        }
        fetchUserPlants()
    }, [isAuthenticated, getAccessTokenSilently])

    const handleAddToGarden = async () => {
        if (!isAuthenticated || !currentUser || !plant) return
        setAdding(true)
        try {
            const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
            await UserPlantService.addPlantToUser({ userId: currentUser.id, plantId: plant.id }, token)
            setUserPlants(prev => [...prev, plant.id])
        } catch (error) {
            alert('Failed to add plant to garden.')
        } finally {
            setAdding(false)
        }
    }

    const handleRemoveFromGarden = async () => {
        if (!isAuthenticated || !currentUser || !plant) return
        setRemoving(true)
        try {
            const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
            const userPlantsRes = await UserPlantService.fetchByUserId(currentUser.id, token)
            const userPlant = userPlantsRes.find(up => up.plantId === plant.id)
            if (!userPlant) return
            await UserPlantService.deleteUserPlant(userPlant.id, token)
            setUserPlants(prev => prev.filter(id => id !== plant.id))
        } catch (error) {
            alert('Failed to remove plant from garden.')
        } finally {
            setRemoving(false)
        }
    }

    const isInGarden = plant && userPlants.includes(plant.id)

    return (
        <PageWrapper
            header={
                <PageHeader
                    title={!isLoadingPlant ? plant?.commonName || '' : ''}
                    backButton={true}
                />
            }
        >
            {!isLoadingPlant ? (
                <>
                    {plant?.description && <h3>DESCRIPTION: {plant.description}</h3>}
                    {plant?.scientificName && <h3>SCIENTIFIC NAME: {plant.scientificName}</h3>}
                    {(plant?.plantFamilyId !== undefined && plant?.plantFamilyId !== null) && <h3>FAMILY ID: {plant.plantFamilyId}</h3>}
                    {(plant?.plantTypeId !== undefined && plant?.plantTypeId !== null) && <h3>TYPE ID: {plant.plantTypeId}</h3>}
                    {(plant?.perennial !== undefined && plant?.perennial !== null) && (
                        <h3>PERENNIAL: {plant.perennial ? 'YES' : 'NO'}</h3>
                    )}
                    {(plant?.indeterminate !== undefined && plant?.indeterminate !== null) && (
                        <h3>
                            INDETERMINATE: {plant.indeterminate ? 'YES' : 'NO'}
                        </h3>
                    )}
                    {(plant?.sowingDepth !== undefined && plant?.sowingDepth !== null) && (
                        <h3>SOWING DEPTH: {plant.sowingDepth}</h3>)}
                    {(plant?.daysToGermination !== undefined && plant?.daysToGermination !== null) && (
                        <h3>
                            DAYS TO GERMINATION: {plant.daysToGermination}
                        </h3>
                    )}
                    {((plant?.germinationTempHigh !== undefined && plant?.germinationTempHigh !== null) || (plant?.germinationTempLow !== undefined && plant?.germinationTempLow !== null)) && (
                        <h3>
                            GERMINATION TEMPERATURES: {plant.germinationTempLow ?? ''}{(plant.germinationTempLow !== undefined && plant.germinationTempLow !== null && plant?.germinationTempHigh !== undefined && plant?.germinationTempHigh !== null) ? ' - ' : ''}{plant.germinationTempHigh ?? ''}
                        </h3>
                    )}
                    {(plant?.daysToHarvest !== undefined && plant?.daysToHarvest !== null) && (
                        <h3>DAYS TO HARVEST: {plant.daysToHarvest}</h3>)}
                    {(plant?.spacing !== undefined && plant?.spacing !== null) && (
                        <h3>PLANT SPACING: {plant.spacing}</h3>)}
                    {(plant?.rowSpacing !== undefined && plant?.rowSpacing !== null) && (
                        <h3>ROW SPACING: {plant.rowSpacing}</h3>)}
                    {plant?.soil && <h3>SOIL: {plant.soil}</h3>}
                    {plant?.light && <h3>LIGHT: {plant.light}</h3>}
                    {plant?.water && <h3>WATER: {plant.water}</h3>}
                    {plant?.pruning && <h3>PRUNING: {plant.pruning}</h3>}

                    {/* Add/Remove from Garden Button and Edit Button */}
                    {isAuthenticated && plant && (
                        <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                            {isInGarden ? (
                                <Button
                                    title='Remove from Garden'
                                    onPress={handleRemoveFromGarden}
                                    type='button'
                                    variant='delete'
                                />
                            ) : (
                                <Button
                                    title="Add to Garden"
                                    onPress={handleAddToGarden}
                                    type="submit"
                                    variant="primary"
                                />
                            )}
                            {currentUser && currentUser.role === UserRole.Admin && (
                                <Button
                                    title='Edit'
                                    onPress={() => window.location.href = `/plants/${plant.id}/edit`}
                                    type='reset'
                                    variant='edit'
                                />
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Loader />
            )
            }
        </PageWrapper >
    )
}
