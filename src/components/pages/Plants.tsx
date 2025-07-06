import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useRowSelect } from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'
import { useAuth0 } from '@auth0/auth0-react'

import PlantService from '../../services/plants'
import UserPlantService from '../../services/user_plants'
import UserService from '../../services/users'
import { Plant } from '../../../types/Plants'
import { User } from '../../../types/User'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'
import { TableNode } from '@table-library/react-table-library/types/table'

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
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        return plant
                    }}
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                >
                    Add to Garden
                </button>
            )
        },
    },
]

export default function Plants() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const theme = useTheme(getTheme())
    const [getResult, setGetResult] = useState<Plant[] | null>(null)
    const [search, setSearch] = React.useState('')
    const [addingToGarden, setAddingToGarden] = useState<string | null>(null)
    const [userPlants, setUserPlants] = useState<string[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)

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

                    const userPlantsRes = await UserPlantService.fetchByUserId(dbUser.id, token)
                    const userPlantIds = userPlantsRes.map((up: any) => up.plantId)
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

    // Update the columns to include the Add to Garden functionality
    const updatedColumns = [
        ...columns.slice(0, -1), // All columns except the last one
        {
            label: 'Add to Garden',
            renderCell: (item: TableNode) => {
                const plant = item as Plant
                const isInGarden = userPlants.includes(plant.id)
                const isLoading = addingToGarden === plant.id

                if (isInGarden) {
                    return <span style={{ color: 'green', fontSize: '12px' }}>✓ In Garden</span>
                }

                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleAddToGarden(plant.id)
                        }}
                        disabled={isLoading || !isAuthenticated}
                        style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: isLoading ? '#ccc' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Adding...' : 'Add to Garden'}
                    </button>
                )
            },
        },
    ]

    return (
        <PageWrapper
            header={
                <PageHeader
                    title="Plants"
                    actionTitle="Add Plant"
                    onActionPress={() => (window.location.href = `/plants/new`)}
                />
            }
        >
            <label htmlFor="search">
                Search by Name:&nbsp;
                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={handleSearch}
                />
            </label>
            <br />
            {!isLoadingPlants ? (
                <CompactTable
                    columns={updatedColumns}
                    data={data}
                    theme={theme}
                    select={select}
                    sort={sort}
                />
            ) : (
                <Loader />
            )}
        </PageWrapper>
    )
}
