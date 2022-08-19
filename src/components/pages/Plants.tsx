import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useRowSelect } from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'

import PlantService from '../../services/plants'
import { Plant } from '../../types/Plants'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'

const columns = [
    {
        label: 'First Name',
        renderCell: (item: any) => item.first_name,
        sort: { sortKey: 'FIRST_NAME' },
    },
    {
        label: 'Last Name',
        renderCell: (item: any) => item.second_name,
        sort: { sortKey: 'SECOND_NAME' },
    },
    {
        label: 'Type',
        renderCell: (item: any) => (item.type ? item.type : '-'),
        sort: { sortKey: 'TYPE' },
    },
    {
        label: 'Family',
        renderCell: (item: any) => (item.family ? item.family : '-'),
        sort: { sortKey: 'FAMILY' },
    },
    {
        label: 'Perennial',
        renderCell: (item: any) => (item.perennial ? 'YES' : 'NO'),
        sort: { sortKey: 'PERENNIAL' },
    },
]

export default function Plants() {
    const theme = useTheme(getTheme())
    const [getResult, setGetResult] = useState<Plant[] | null>(null)
    const [search, setSearch] = React.useState('')

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

    let data = { nodes: getResult ? getResult : [] }

    const select = useRowSelect(data, {
        onChange: onSelectChange,
    })

    function onSelectChange(action: any, state: any) {
        return (window.location.href = `/plants/${state.id}`)
    }

    const handleSearch = (event: any) => {
        setSearch(event.target.value)
    }

    data = {
        nodes: data.nodes.filter((item) =>
            item.first_name.toLowerCase().includes(search.toLowerCase())
        ),
    }

    const sort = useSort(
        data,
        {},
        {
            sortFns: {
                FIRST_NAME: (array) =>
                    array.sort((a, b) =>
                        a.first_name.localeCompare(b.first_name)
                    ),
                SECOND_NAME: (array) =>
                    array.sort((a, b) =>
                        a.second_name.localeCompare(b.second_name)
                    ),
                TYPE: (array) =>
                    array.sort((a, b) => {
                        return `${a.type ? a.type : 'Z'}`.localeCompare(
                            `${b.type ? b.type : 'Z'}`
                        )
                    }),
                FAMILY: (array) =>
                    array.sort((a, b) => a.family.localeCompare(b.family)),
                PERENNIAL: (array) =>
                    array.sort((a, b) => a.perennial - b.perennial),
            },
        }
    )

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
                    columns={columns}
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
