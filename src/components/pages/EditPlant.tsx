import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { Formik, Field, Form, FormikValues } from 'formik'
import { Plant } from '../../types/Plants'
import PlantService from '../../services/plants'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import { useCallback } from 'react'

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
        const newValues: any = {}
        const keys = Object.keys(values)

        keys.forEach((key, _) => {
            if (values[key] === '') {
                return (newValues[key] = null)
            }
            return (newValues[key] = values[key])
        })

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
              days_to_germination: plantData?.days_to_germination,
              days_to_harvest: plantData?.days_to_harvest,
              description: plantData?.description,
              determinate: plantData?.determinate,
              fall_start_indoors: plantData?.fall_start_indoors,
              fall_start_outdoors: plantData?.fall_start_outdoors,
              fall_transplant: plantData?.fall_transplant,
              family: plantData?.family,
              first_name: plantData?.first_name,
              germination_temps_f: plantData?.germination_temps_f,
              last_day_to_plant: plantData?.last_day_to_plant,
              light: plantData?.light,
              perennial: plantData?.perennial,
              plant_spacing: plantData?.plant_spacing,
              pruning: plantData?.pruning,
              row_spacing: plantData?.row_spacing,
              second_name: plantData?.second_name,
              seed_depth: plantData?.seed_depth,
              soil: plantData?.soil,
              start_indoors: plantData?.start_indoors,
              start_outdoors: plantData?.start_outdoors,
              transplant: plantData?.transplant,
              type: plantData?.type,
              water: plantData?.water,
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
                <Formik
                    style={{ display: 'flex', flexDirection: 'column' }}
                    initialValues={initialValues}
                    onSubmit={HandleSubmit}
                >
                    <Form style={{ width: 500 }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>First Name:</label>
                            <Field name="first_name" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Last Name:</label>
                            <Field name="second_name" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Family:</label>
                            <Field name="family" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Type:</label>
                            <Field name="type" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Start Indoors (Spring):</label>
                            <Field name="start_indoors" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Transplant (Spring):</label>
                            <Field name="transplant" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Start Outdoors (Spring):</label>
                            <Field name="start_outdoors" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Start Indoors (Fall):</label>
                            <Field name="fall_start_indoors" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Transplant (Fall):</label>
                            <Field name="fall_transplant" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Start Outdoors (Fall):</label>
                            <Field name="fall_start_outdoors" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Last Day to Plant:</label>
                            <Field name="last_day_to_plant" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Days to Germination:</label>
                            <Field name="days_to_germination" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Germination Temperatures (F):</label>
                            <Field name="germination_temps_f" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Plant Spacing (Inches):</label>
                            <Field name="plant_spacing" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Row Spacing (Inches):</label>
                            <Field name="row_spacing" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Seed Depth (Inches):</label>
                            <Field name="seed_depth" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Days to Harvest:</label>
                            <Field name="days_to_harvest" type="integer" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Light:</label>
                            <Field name="light" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Soil:</label>
                            <Field name="soil" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Water:</label>
                            <Field name="water" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Pruning:</label>
                            <Field name="pruning" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Perennial:</label>
                            <Field name="perennial" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Determinate:</label>
                            <Field name="determinate" type="text" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}
                        >
                            <label>Description:</label>
                            <Field name="description" type="textarea" />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            ) : (
                <div>LOADING</div>
            )}
        </PageWrapper>
    )
}
