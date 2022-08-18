import { useMutation } from 'react-query'
import { Formik, Field, Form, FormikValues } from 'formik'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import PlantService from '../../services/plants'
import { addEditMapping } from '../../helpers'

export default function AddPlant() {
    const mutation = useMutation((data) => {
        return PlantService.createOne(data)
    })

    const HandleSubmit = async (values: any) => {
        const newValues = await addEditMapping(values)

        await mutation.mutate(newValues)

        return (window.location.href = '/plants')
    }

    const initialValues: FormikValues = {
        days_to_germination: '',
        days_to_harvest: '',
        description: '',
        determinate: '',
        fall_start_indoors: '',
        fall_start_outdoors: '',
        fall_transplant: '',
        family: '',
        first_name: '',
        germination_temps_f: '',
        last_day_to_plant: '',
        light: '',
        perennial: '',
        plant_spacing: '',
        pruning: '',
        row_spacing: '',
        second_name: '',
        seed_depth: '',
        soil: '',
        start_indoors: '',
        start_outdoors: '',
        transplant: '',
        type: '',
        water: '',
    }

    return (
        <PageWrapper
            header={<PageHeader title="Add Plant" backButton={true} />}
        >
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
        </PageWrapper>
    )
}
