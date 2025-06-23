import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useRowSelect } from '@table-library/react-table-library/select'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useSort } from '@table-library/react-table-library/sort'

import PlantService from '../../services/plants'
import { Plant } from '../../../types/Plants'
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
