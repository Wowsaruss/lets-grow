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
                    actionTitle="edit"
                    onActionPress={() =>
                        (window.location.href = `/plants/${plant?.id}/edit`)
                    }
                />
            }
        >
            {!isLoadingPlant ? (
                <>
                    {plant?.description ? (
                        <h3>DESCRIPTION: {plant?.description}</h3>
                    ) : null}
                    {plant?.type ? <h3>TYPE: {plant?.type}</h3> : null}
                    {plant?.family ? <h3>FAMILY: {plant?.family}</h3> : null}
                    {plant?.perennial !== null ? (
                        <h3>PERENNIAL: {plant?.perennial ? 'YES' : 'NO'}</h3>
                    ) : null}
                    {plant?.determinate !== null ? (
                        <h3>
                            DETERMINATE: {plant?.determinate ? 'YES' : 'NO'}
                        </h3>
                    ) : null}
                    {plant?.seed_depth ? (
                        <h3>SEED DEPTH: {plant?.seed_depth}</h3>
                    ) : null}
                    {plant?.days_to_germination ? (
                        <h3>
                            DAYS TO GERMINATION: {plant?.days_to_germination}
                        </h3>
                    ) : null}
                    {plant?.germination_temps_f ? (
                        <h3>
                            GERMINATION TEMPERATURES:{' '}
                            {plant?.germination_temps_f}
                        </h3>
                    ) : null}
                    {plant?.days_to_harvest ? (
                        <h3>DAYS TO HARVEST: {plant?.days_to_harvest}</h3>
                    ) : null}
                    {plant?.plant_spacing ? (
                        <h3>PLANT SPACING: {plant?.plant_spacing}</h3>
                    ) : null}
                    {plant?.row_spacing ? (
                        <h3>ROW SPACING: {plant?.row_spacing}</h3>
                    ) : null}
                    {plant?.start_indoors ? (
                        <h3>START INDOORS: {plant?.start_indoors}</h3>
                    ) : null}
                    {plant?.transplant ? (
                        <h3>TRANSPLANT: {plant?.transplant}</h3>
                    ) : null}
                    {plant?.start_outdoors ? (
                        <h3>START OUTDOORS: {plant?.start_outdoors}</h3>
                    ) : null}
                    {plant?.fall_start_indoors ? (
                        <h3>
                            START INDOORS (FALL): {plant?.fall_start_indoors}
                        </h3>
                    ) : null}
                    {plant?.fall_transplant ? (
                        <h3>TRANSPLANT (FALL): {plant?.fall_transplant}</h3>
                    ) : null}
                    {plant?.fall_start_outdoors ? (
                        <h3>
                            START OUTDOORS (FALL): {plant?.fall_start_outdoors}
                        </h3>
                    ) : null}
                    {plant?.last_day_to_plant ? (
                        <h3>LAST DAY TO PLANT: {plant?.last_day_to_plant}</h3>
                    ) : null}
                    {plant?.soil ? <h3>SOIL: {plant?.soil}</h3> : null}
                    {plant?.light ? <h3>LIGHT: {plant?.light}</h3> : null}
                    {plant?.water ? <h3>WATER: {plant?.water}</h3> : null}
                    {plant?.pruning ? <h3>PRUNING: {plant?.pruning}</h3> : null}
                </>
            ) : (
                <Loader />
            )}
        </PageWrapper>
    )
}
