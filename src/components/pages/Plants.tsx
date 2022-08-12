import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useRowSelect } from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

import PlantService from '../../services/plants'
import { Plant } from '../../types/Plants'
import PageWrapper from '../PageWrapper'

const columns = [
    { label: 'First Name', renderCell: (item: any) => item.first_name },
    { label: 'Last Name', renderCell: (item: any) => item.second_name },
    { label: 'Type', renderCell: (item: any) => item.type },
    { label: 'Family', renderCell: (item: any) => item.family },
    { label: 'Perennial', renderCell: (item: any) => item.perennial },
]

export default function Plants() {
    const theme = useTheme(getTheme())
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

    const select = useRowSelect(data, {
        onChange: onSelectChange,
    })

    function onSelectChange(action: any, state: any) {
        // To-do: add action when selecting plant row
        console.log(action, state)
    }

    return (
        <PageWrapper
            header={
                <div
                    style={{
                        // position: 'fixed',
                        height: 70,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        boxShadow: '-5px 4px 10px #f2f2f2',
                        paddingLeft: 25,
                    }}
                >
                    <h1>Plants</h1>
                </div>
            }
        >
            <CompactTable
                columns={columns}
                data={data}
                theme={theme}
                select={select}
            />
        </PageWrapper>
    )
}
