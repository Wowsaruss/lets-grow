import { Formik, Field, Form, FormikValues } from 'formik'
import * as Yup from 'yup'
import Button from './Button'

import 'react-datepicker/dist/react-datepicker.css'

interface Props {
    initialValues: FormikValues
    handleSubmit: (values: any) => Promise<string>
    onDelete?: () => void
}

export default function PlantForm({ initialValues, handleSubmit, onDelete }: Props) {
    const validationSchema = Yup.object({
        commonName: Yup.string().required('Required'),
        scientificName: Yup.string(),
        description: Yup.string(),
        plantFamilyId: Yup.number(),
        plantTypeId: Yup.number(),
        daysToGermination: Yup.number(),
        daysToHarvest: Yup.number(),
        indeterminate: Yup.boolean(),
        germinationTempHigh: Yup.number(),
        germinationTempLow: Yup.number(),
        light: Yup.string(),
        water: Yup.string(),
        soil: Yup.string(),
        perennial: Yup.boolean(),
        heirloom: Yup.boolean(),
        hybrid: Yup.boolean(),
        openPollinated: Yup.boolean(),
        selfPollinated: Yup.boolean(),
        spacing: Yup.number(),
        rowSpacing: Yup.number(),
        pruning: Yup.string(),
        sowingDepth: Yup.number(),
    })

    return (
        <Formik
            style={{ display: 'flex', flexDirection: 'column' }}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form style={{ width: 500 }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Common Name:</label>
                    <Field name="commonName" type="text" required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Scientific Name:</label>
                    <Field name="scientificName" type="text" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Description:</label>
                    <Field name="description" as="textarea" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Plant Family ID:</label>
                    <Field name="plantFamilyId" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Plant Type ID:</label>
                    <Field name="plantTypeId" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Days to Germination:</label>
                    <Field name="daysToGermination" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Days to Harvest:</label>
                    <Field name="daysToHarvest" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Indeterminate:</label>
                    <Field name="indeterminate" as="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Germination Temp High:</label>
                    <Field name="germinationTempHigh" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Germination Temp Low:</label>
                    <Field name="germinationTempLow" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
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
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
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
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
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
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Perennial:</label>
                    <Field name="perennial" as="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Heirloom:</label>
                    <Field name="heirloom" as="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Hybrid:</label>
                    <Field name="hybrid" as="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Open Pollinated:</label>
                    <Field name="openPollinated" as="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Self Pollinated:</label>
                    <Field name="selfPollinated" as="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Field>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Spacing:</label>
                    <Field name="spacing" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Row Spacing:</label>
                    <Field name="rowSpacing" type="number" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Pruning:</label>
                    <Field name="pruning" type="text" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label>Sowing Depth:</label>
                    <Field name="sowingDepth" type="number" />
                </div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 32 }}>
                    {onDelete && (
                        <Button
                            type="button"
                            title="Delete"
                            variant="delete"
                            onPress={onDelete}
                        />
                    )}
                    <Button type="submit" title="Submit" />
                </div>
            </Form>
        </Formik>
    )
}
