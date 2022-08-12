import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import PlantService from '../../services/plants'
import { Plant } from '../../types/Plants'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'

export default function PlantDetails() {
    const params: Record<string, any> = useParams()
    const [plant, setPlant] = useState<Plant | null>(null)

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
    }, [isLoadingPlant, getPlant])

    return (
        <PageWrapper
            header={
                <PageHeader
                    title={
                        !isLoadingPlant
                            ? `${plant?.second_name} ${plant?.first_name}`
                            : ''
                    }
                    backButton={true}
                />
            }
        >
            {plant?.description ? (
                <h3>description: {plant?.description}</h3>
            ) : null}
            {plant?.type ? <h3>type: {plant?.type}</h3> : null}
            {plant?.perennial ? <h3>perennial: {plant?.perennial}</h3> : null}
            {plant?.seed_depth ? (
                <h3>seed_depth: {plant?.seed_depth}</h3>
            ) : null}
        </PageWrapper>
    )
}
