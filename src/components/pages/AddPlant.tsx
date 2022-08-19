import { useMutation } from 'react-query'
import { FormikValues } from 'formik'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import PlantService from '../../services/plants'
import { addEditMapping } from '../../helpers'
import PlantForm from '../PlantForm'

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
            <PlantForm
                initialValues={initialValues}
                handleSubmit={HandleSubmit}
            />
        </PageWrapper>
    )
}
