import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useRowSelect } from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

import PlantService from '../../services/plants'
import UserPlantService from '../../services/user_plants'
import UserService from '../../services/users'
import { Plant } from '../../types/Plants'
import { User, UserRole } from '../../types/User'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'
import { TableNode } from '@table-library/react-table-library/types/table'
import Button from '../Button'

const columns = [
    {
        label: 'Common Name',
        renderCell: (item: TableNode) => (item as Plant).commonName,
        sort: { sortKey: 'COMMON_NAME' },
    },
    {
        label: 'Scientific Name',
        renderCell: (item: TableNode) => (item as Plant).scientificName,
        sort: { sortKey: 'SCIENTIFIC_NAME' },
    },
    {
        label: 'Type ID',
        renderCell: (item: TableNode) => (item as Plant).plantTypeId ? (item as Plant).plantTypeId : '-',
        sort: { sortKey: 'PLANT_TYPE_ID' },
    },
    {
        label: 'Family ID',
        renderCell: (item: TableNode) => (item as Plant).plantFamilyId ? (item as Plant).plantFamilyId : '-',
        sort: { sortKey: 'PLANT_FAMILY_ID' },
    },
    {
        label: 'Perennial',
        renderCell: (item: TableNode) => (item as Plant).perennial ? 'YES' : 'NO',
        sort: { sortKey: 'PERENNIAL' },
    },
    {
        label: 'Add to Garden',
        renderCell: (item: TableNode) => {
            const plant = item as Plant
            // userPlants is in the component scope, so we need to access it from closure
            // We'll redefine columns inside the component to access userPlants, handlers, etc.
            return null // placeholder, will redefine below
        },
    },
]

export default function Plants() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const theme = useTheme(getTheme())
    const [getResult, setGetResult] = useState<Plant[] | null>(null)
    const [search, setSearch] = React.useState('')
    const [addingToGarden, setAddingToGarden] = useState<string | null>(null)
    const [removingFromGarden, setRemovingFromGarden] = useState<string | null>(null)
    const [userPlants, setUserPlants] = useState<string[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const navigate = useNavigate();

    const { isLoading: isLoadingPlants, refetch: getAllPlants } = useQuery<
        Plant[],
        Error
    >(
        'query-plants',
        async () => {
            return await PlantService.fetchAll()
        },
        {
            enabled: false,
            onSuccess: (res: any) => {
                setGetResult(res)
            },
            onError: (err: any) => {
                setGetResult(err)
            },
        }
    )

    // Fetch user's plants to show which ones are already in their garden
    useEffect(() => {
        if (isAuthenticated && user) {
            const fetchUserPlants = async () => {
                try {
                    // Get current user from database
                    const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
                    const dbUser = await UserService.getCurrentUser(token)
                    setCurrentUser(dbUser)

                    const userPlants = await PlantService.fetchUserPlants(dbUser.id, token)
                    const userPlantIds = userPlants.map(plant => plant.id)
                    setUserPlants(userPlantIds)
                } catch (error) {
                    console.error('Error fetching user plants:', error)
                }
            }

            fetchUserPlants()
        }
    }, [isAuthenticated, user, getAccessTokenSilently])

    useEffect(() => {
        getAllPlants()
    }, [isLoadingPlants, getAllPlants])

    let data = { nodes: getResult ? getResult : [] }

    const select = useRowSelect(data, {
        onChange: onSelectChange,
    })

    function onSelectChange(action: any, state: any) {
        return (window.location.href = `/plants/${state.id}`)
    }

    const handleAddToGarden = async (plantId: string) => {
        if (!isAuthenticated || !currentUser) {
            alert('Please log in to add plants to your garden')
            return
        }

        setAddingToGarden(plantId)
        try {
            const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
            await UserPlantService.addPlantToUser({ userId: currentUser.id, plantId }, token)
            // Update the userPlants state to include the new plant
            setUserPlants(prev => [...prev, plantId])
            alert('Plant added to your garden!')
        } catch (error) {
            console.error('Error adding plant to garden:', error)
            alert('Failed to add plant to garden. Please try again.')
        } finally {
            setAddingToGarden(null)
        }
    }

    const handleRemoveFromGarden = async (plantId: string) => {
        if (!isAuthenticated || !currentUser) {
            alert('Please log in to manage your garden')
            return
        }

        // Find the plant name for the confirmation dialog
        const plant = getResult?.find(p => p.id === plantId)
        if (!plant) return

        // Ask for confirmation
        const isConfirmed = window.confirm(
            `Are you sure you want to remove "${plant.commonName}" from your garden?`
        )

        if (!isConfirmed) return

        setRemovingFromGarden(plantId)
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

            // Update the userPlants state to remove the plant
            setUserPlants(prev => prev.filter(id => id !== plantId))
            alert('Plant removed from your garden!')
        } catch (error) {
            console.error('Error removing plant from garden:', error)
            alert('Failed to remove plant from garden. Please try again.')
        } finally {
            setRemovingFromGarden(null)
        }
    }

    const handleSearch = (event: any) => {
        setSearch(event.target.value)
    }

    data = {
        nodes: data.nodes.filter((item: Plant) =>
            item.commonName?.toLowerCase().includes(search.toLowerCase())
        ),
    }

    const sort = useSort(
        data,
        {},
        {
            sortFns: {
                COMMON_NAME: (array: TableNode[]) =>
                    array.sort((a, b) =>
                        ((a as Plant).commonName || '').localeCompare((b as Plant).commonName || '')
                    ),
                SCIENTIFIC_NAME: (array: TableNode[]) =>
                    array.sort((a, b) =>
                        ((a as Plant).scientificName || '').localeCompare((b as Plant).scientificName || '')
                    ),
                PLANT_TYPE_ID: (array: TableNode[]) =>
                    array.sort((a, b) => ((a as Plant).plantTypeId || 0) - ((b as Plant).plantTypeId || 0)),
                PLANT_FAMILY_ID: (array: TableNode[]) =>
                    array.sort((a, b) => ((a as Plant).plantFamilyId || 0) - ((b as Plant).plantFamilyId || 0)),
                PERENNIAL: (array: TableNode[]) =>
                    array.sort((a, b) => Number((a as Plant).perennial) - Number((b as Plant).perennial)),
            },
        }
    )

    // Redefine columns here to access userPlants and handlers
    const columnsWithGarden = [
        ...columns.slice(0, 5),
        {
            label: 'Add to Garden',
            renderCell: (item: TableNode) => {
                const plant = item as Plant
                const isInGarden = userPlants.includes(plant.id)
                if (isInGarden) {
                    return (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveFromGarden(plant.id)
                            }}
                            disabled={removingFromGarden === plant.id}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                padding: '4px 8px',
                                fontSize: '12px',
                                cursor: removingFromGarden === plant.id ? 'not-allowed' : 'pointer',
                                opacity: removingFromGarden === plant.id ? 0.6 : 1
                            }}
                        >
                            {removingFromGarden === plant.id ? 'Removing...' : 'Remove from Garden'}
                        </button>
                    )
                } else {
                    return (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleAddToGarden(plant.id)
                            }}
                            disabled={addingToGarden === plant.id}
                            style={{
                                backgroundColor: '#2d5a27',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                padding: '4px 8px',
                                fontSize: '12px',
                                cursor: addingToGarden === plant.id ? 'not-allowed' : 'pointer',
                                opacity: addingToGarden === plant.id ? 0.6 : 1
                            }}
                        >
                            {addingToGarden === plant.id ? 'Adding...' : 'Add to Garden'}
                        </button>
                    )
                }
            },
        },
    ]

    return (
        <PageWrapper header={<PageHeader title="Plants" />}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
                {currentUser && currentUser.role === UserRole.Admin && (
                    <Button
                        title='+ Add Plant'
                        onPress={() => navigate('/plants/new')}
                        type='button'
                        variant='primary'
                    />
                )}
            </div>
            <input
                type="text"
                placeholder="Search plants..."
                value={search}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
            />
            {isLoadingPlants ? (
                <Loader />
            ) : (
                <CompactTable
                    columns={columnsWithGarden}
                    data={data}
                    theme={theme}
                    select={select}
                />
            )}
        </PageWrapper>
    )
}
