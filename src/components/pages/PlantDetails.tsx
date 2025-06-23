import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Plant } from '../../../types/Plants'
import PlantService from '../../services/plants'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import Loader from '../Loader'

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
    }, [getPlant])

    return (
        <PageWrapper
            header={
                <PageHeader
                    title={!isLoadingPlant ? plant?.commonName || '' : ''}
                    backButton={true}
                    actionTitle="edit"
                    onActionPress={() =>
                        (window.location.href = `/plants/${plant?.id}/edit`)
                    }
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
                        <h3>SOWING DEPTH: {plant.sowingDepth}</h3>
                    )}
                    {(plant?.daysToGermination !== undefined && plant?.daysToGermination !== null) && (
                        <h3>
                            DAYS TO GERMINATION: {plant.daysToGermination}
                        </h3>
                    )}
                    {((plant?.germinationTempHigh !== undefined && plant?.germinationTempHigh !== null) || (plant?.germinationTempLow !== undefined && plant?.germinationTempLow !== null)) && (
                        <h3>
                            GERMINATION TEMPERATURES: {plant.germinationTempLow ?? ''}{(plant.germinationTempLow !== undefined && plant.germinationTempLow !== null && plant.germinationTempHigh !== undefined && plant.germinationTempHigh !== null) ? ' - ' : ''}{plant.germinationTempHigh ?? ''}
                        </h3>
                    )}
                    {(plant?.daysToHarvest !== undefined && plant?.daysToHarvest !== null) && (
                        <h3>DAYS TO HARVEST: {plant.daysToHarvest}</h3>
                    )}
                    {(plant?.spacing !== undefined && plant?.spacing !== null) && (
                        <h3>PLANT SPACING: {plant.spacing}</h3>
                    )}
                    {(plant?.rowSpacing !== undefined && plant?.rowSpacing !== null) && (
                        <h3>ROW SPACING: {plant.rowSpacing}</h3>
                    )}
                    {plant?.soil && <h3>SOIL: {plant.soil}</h3>}
                    {plant?.light && <h3>LIGHT: {plant.light}</h3>}
                    {plant?.water && <h3>WATER: {plant.water}</h3>}
                    {plant?.pruning && <h3>PRUNING: {plant.pruning}</h3>}
                </>
            ) : (
                <Loader />
            )}
        </PageWrapper>
    )
}
