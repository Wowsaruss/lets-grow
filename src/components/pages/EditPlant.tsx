import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { FormikValues } from 'formik'
import { Plant } from '../../../types/Plants'
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
              commonName: plantData?.commonName || '',
              scientificName: plantData?.scientificName || '',
              description: plantData?.description || '',
              plantFamilyId: plantData?.plantFamilyId ?? 0,
              plantTypeId: plantData?.plantTypeId ?? 0,
              daysToGermination: plantData?.daysToGermination ?? 0,
              daysToHarvest: plantData?.daysToHarvest ?? 0,
              indeterminate: plantData?.indeterminate ?? false,
              germinationTempHigh: plantData?.germinationTempHigh ?? 0,
              germinationTempLow: plantData?.germinationTempLow ?? 0,
              light: plantData?.light || '',
              water: plantData?.water || '',
              soil: plantData?.soil || '',
              perennial: plantData?.perennial ?? false,
              heirloom: plantData?.heirloom ?? false,
              hybrid: plantData?.hybrid ?? false,
              openPollinated: plantData?.openPollinated ?? false,
              selfPollinated: plantData?.selfPollinated ?? false,
              spacing: plantData?.spacing ?? 0,
              rowSpacing: plantData?.rowSpacing ?? 0,
              pruning: plantData?.pruning || '',
              sowingDepth: plantData?.sowingDepth ?? 0,
          }
        : {}

    return (
        <PageWrapper
            header={
                <PageHeader
                    title={!isLoadingPlant ? (plantData?.commonName || '') : ''}
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
