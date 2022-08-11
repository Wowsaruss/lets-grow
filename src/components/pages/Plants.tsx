import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import PlantService from '../../services/plants'
import { Plant } from '../../types/Plants'

const columns = [
    { label: 'First Name', renderCell: (item: any) => item.first_name },
    { label: 'Last Name', renderCell: (item: any) => item.second_name },
    { label: 'Type', renderCell: (item: any) => item.type },
    { label: 'Family', renderCell: (item: any) => item.family },
    { label: 'Perennial', renderCell: (item: any) => item.perennial},
]

export default function Plants() {
    const theme = useTheme(getTheme());
    const [getResult, setGetResult] = useState<Plant[] | null>(null)

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

    useEffect(() => {
        getAllPlants()
    }, [isLoadingPlants, getAllPlants])

    const data = { nodes: getResult ? getResult : [] }

    return (
        <div>
            <h1>PLANTS!</h1>
            <CompactTable columns={columns} data={data} theme={theme} />
        </div>
    )
}

