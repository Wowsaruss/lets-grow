import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import PlantService from '../../services/plants'
import { Plant } from '../../types/Plants'

export default function Plants() {
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

    console.log(getResult)

    return (
        <div>
            <h1>PLANTS!</h1>
            {getResult?.map((plant, i) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <h2 key={i}>{plant.first_name}</h2>
                        <h3 key={i}>{plant.type}</h3>
                    </div>
                )
            })}
        </div>
    )
}
