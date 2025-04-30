import { Formik, Field, Form, FormikValues } from 'formik'
import * as Yup from 'yup'
import Button from './Button'
import { DatePickerField } from './DatePickerField'

import 'react-datepicker/dist/react-datepicker.css'

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
                    <Field name="family" as="select">
                        <option value="Asteraceae">Asteraceae</option>
                        <option value="Brassicacae">Brassicacae</option>
                        <option value="Cucurbitaceae">Cucurbitaceae</option>
                        <option value="Cyanococcus">Cyanococcus</option>
                        <option value="Fabaceae">Fabaceae</option>
                        <option value="Lamiaceae">Lamiaceae</option>
                        <option value="Liliaceae">Liliaceae</option>
                        <option value="Poaceae">Poaceae</option>
                        <option value="Rosaceae">Rosaceae</option>
                        <option value="Solanaceae">Solanaceae</option>
                        <option value="Solanaceae">Solanaceae</option>
                        <option value="Other">Other</option>
                        <option value="">None</option>
                    </Field>
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
                    <Field name="type" as="select">
                        <option value="Bush">Bush</option>
                        <option value="Herb">Herb</option>
                        <option value="Leaf">Leaf</option>
                        <option value="Root">Root</option>
                        <option value="Vine">Vine</option>
                        <option value="Stalk">Stalk</option>
                        <option value="Thistle">Thistle</option>
                        <option value="Vine">Vine</option>
                        <option value="Tree">Tree</option>
                        <option value="Other">Other</option>
                        <option value="">None</option>
                    </Field>
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
                    <DatePickerField name="start_indoors" />
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
                    <DatePickerField name="transplant" />
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
                    <DatePickerField name="start_outdoors" />
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
                    <DatePickerField name="fall_start_indoors" />
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
                    <DatePickerField name="fall_transplant" />
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
                    <DatePickerField name="fall_start_outdoors" />
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
                    <DatePickerField name="last_day_to_plant" />
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
                    <label>Seed Depth:</label>
                    <Field name="seed_depth" as="select">
                        <option value="1/8">1/8"</option>
                        <option value="1/4">1/4"</option>
                        <option value="1/2">1/2"</option>
                        <option value="3/4">3/4"</option>
                        <option value="1">1"</option>
                        <option value="1 1/4">1 1/4"</option>
                        <option value="1 1/2">1 1/2"</option>
                        <option value="1 3/4">1 3/4"</option>
                        <option value="2">2"</option>
                        <option value="3">3"</option>
                        <option value="4">4"</option>
                        <option value="5">5"</option>
                        <option value="6">6"</option>
                        <option value="Other">Other</option>
                        <option value="">None</option>
                    </Field>
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
                    <Field name="light" as="select">
                        <option value="Full">Full</option>
                        <option value="Full/Partial">Full/Partial</option>
                        <option value="Partial">Partial</option>
                        <option value="Partial/Low">Partial/Low</option>
                        <option value="Low">Low</option>
                        <option value="Any">Any</option>
                        <option value="Other">Other</option>
                        <option value="">None</option>
                    </Field>
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
                    <Field name="soil" as="select">
                        <option value="Loamy">Loamy</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Silty">Silty</option>
                        <option value="Peaty">Peaty</option>
                        <option value="Chalky">Chalky</option>
                        <option value="Clay">Clay</option>
                        <option value="Any">Any</option>
                        <option value="Other">Other</option>
                        <option value="">None</option>
                    </Field>
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
                    <Field name="water" as="select">
                        <option value="Heavy">Heavy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Light">Light</option>
                        <option value="Any">Any</option>
                        <option value="Other">Other</option>
                        <option value="">None</option>
                    </Field>
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
                    <Field name="perennial" as="select">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Field>
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
                    <Field name="determinate" as="select">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Field>
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
