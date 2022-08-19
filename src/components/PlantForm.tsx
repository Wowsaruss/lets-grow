import { Formik, Field, Form, FormikValues } from 'formik'
import * as Yup from 'yup'
import Button from './Button'

interface Props {
    initialValues: FormikValues
    handleSubmit: (values: any) => Promise<string>
}

export default function PlantForm({ initialValues, handleSubmit }: Props) {
    const validationSchema = Yup.object({
        days_to_germination: Yup.string(),
        days_to_harvest: Yup.number(),
        description: Yup.string(),
        determinate: Yup.boolean(),
        fall_start_indoors: Yup.string(),
        fall_start_outdoors: Yup.string(),
        fall_transplant: Yup.string(),
        family: Yup.string(),
        first_name: Yup.string().required('Required'),
        germination_temps_f: Yup.string(),
        last_day_to_plant: Yup.string(),
        light: Yup.string(),
        perennial: Yup.boolean(),
        plant_spacing: Yup.number(),
        pruning: Yup.string(),
        row_spacing: Yup.number(),
        second_name: Yup.string().required('Required'),
        seed_depth: Yup.string(),
        soil: Yup.string(),
        start_indoors: Yup.string(),
        start_outdoors: Yup.string(),
        transplant: Yup.string(),
        type: Yup.string(),
        water: Yup.string(),
    })

    return (
        <Formik
            style={{ display: 'flex', flexDirection: 'column' }}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    <Field name="first_name" type="text" required />
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
                    <Field name="second_name" type="text" required />
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
                <Button type="submit" title="Submit" />
            </Form>
        </Formik>
    )
}
