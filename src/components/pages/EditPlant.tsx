import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { FormikValues } from 'formik'
import { Plant } from '../../types/Plants'
import PlantService from '../../services/plants'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import { useCallback } from 'react'
import { addEditMapping } from '../../helpers'
import Loader from '../Loader'
import PlantForm from '../PlantForm'

export default function EditPlant() {
    const { plantId }: Record<string, any> = useParams()

    const { isLoading: isLoadingPlant, data: plantData } = useQuery<
        Plant,
        Error
    >(
        'query-plant',
        async () => {
            return PlantService.fetchOne(plantId)
        },
        {}
    )

    const editMutation = useMutation((data) => {
        return PlantService.updateOne(plantId, data)
    })

    const deleteMutation = useMutation(() => {
        return PlantService.deleteOne(plantId)
    })

    const HandleSubmit = async (values: any) => {
        const newValues = await addEditMapping(values)

        await editMutation.mutate(newValues)

        return (window.location.href = `/plants/${plantId}`)
    }

    const handleDelete = useCallback(async () => {
        await deleteMutation.mutate()

        window.location.href = '/plants'
    }, [deleteMutation])

    const isLoaded = !isLoadingPlant && !!plantData

    const initialValues: FormikValues = isLoaded
        ? {
              days_to_germination:
                  plantData?.days_to_germination !== null
                      ? plantData?.days_to_germination
                      : '',
              days_to_harvest:
                  plantData?.days_to_harvest !== null
                      ? plantData?.days_to_harvest
                      : 0,
              description:
                  plantData?.description !== null ? plantData?.description : '',
              determinate:
                  plantData?.determinate !== null ? plantData?.determinate : '',
              fall_start_indoors:
                  plantData?.fall_start_indoors !== null
                      ? plantData?.fall_start_indoors
                      : '',
              fall_start_outdoors:
                  plantData?.fall_start_outdoors !== null
                      ? plantData?.fall_start_outdoors
                      : '',
              fall_transplant:
                  plantData?.fall_transplant !== null
                      ? plantData?.fall_transplant
                      : '',
              family: plantData?.family !== null ? plantData?.family : '',
              first_name: plantData?.first_name,
              germination_temps_f:
                  plantData?.germination_temps_f !== null
                      ? plantData?.germination_temps_f
                      : '',
              last_day_to_plant:
                  plantData?.last_day_to_plant !== null
                      ? plantData?.last_day_to_plant
                      : '',
              light: plantData?.light !== null ? plantData?.light : '',
              perennial:
                  plantData?.perennial !== null ? plantData?.perennial : '',
              plant_spacing:
                  plantData?.plant_spacing !== null
                      ? plantData?.plant_spacing
                      : 0,
              pruning: plantData?.pruning !== null ? plantData?.pruning : '',
              row_spacing:
                  plantData?.row_spacing !== null ? plantData?.row_spacing : 0,
              second_name: plantData?.second_name,
              seed_depth:
                  plantData?.seed_depth !== null ? plantData?.seed_depth : '',
              soil: plantData?.soil !== null ? plantData?.soil : '',
              start_indoors:
                  plantData?.start_indoors !== null
                      ? plantData?.start_indoors
                      : '',
              start_outdoors:
                  plantData?.start_outdoors !== null
                      ? plantData?.start_outdoors
                      : '',
              transplant:
                  plantData?.transplant !== null ? plantData?.transplant : '',
              type: plantData?.type !== null ? plantData?.type : '',
              water: plantData?.water !== null ? plantData?.water : '',
          }
        : {}

    return (
        <PageWrapper
            header={
                <PageHeader
                    title={
                        !isLoadingPlant
                            ? `${plantData?.second_name} ${plantData?.first_name}`
                            : ''
                    }
                    backButton={true}
                    actionTitle="Delete"
                    onActionPress={handleDelete}
                />
            }
        >
            {isLoaded ? (
                <PlantForm
                    initialValues={initialValues}
                    handleSubmit={HandleSubmit}
                />
            ) : (
                <Loader />
            )}
        </PageWrapper>
    )
}
