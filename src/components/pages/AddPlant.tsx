import { useMutation, useQuery } from 'react-query'
import { FormikValues } from 'formik'
import PlantService from '../../services/plants'
import { addEditMapping } from '../../helpers'
import PlantForm from '../PlantForm'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import { useAuthToken, getStoredToken } from '../../services/auth'
import UserService from '../../services/users'
import { useEffect } from 'react'
import { User as ApiUser } from '../../../types/User'

interface User {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
    is_active: boolean;
    created_at: string;
}

export default function AddPlant() {
    const { getToken } = useAuthToken()
    
    // Get token before fetching user data
    useEffect(() => {
        getToken()
    }, [getToken])

    const { data: userData, isLoading: isUserLoading } = useQuery<ApiUser>(
        'currentUser',
        UserService.getCurrentUser,
        {
            enabled: !!getStoredToken(), // Only run query if we have a token
            retry: false, // Don't retry on failure
        }
    )
    
    const mutation = useMutation(async (data) => {
        // Ensure we have a valid token before making the request
        await getToken()
        return PlantService.createOne(data)
    })

    const HandleSubmit = async (values: any): Promise<string> => {
        if (!userData?.id) {
            console.error('No user data available')
            return '/plants' // Return the redirect path even on error
        }

        const newValues = await addEditMapping(values)
        newValues.user_id = userData.id

        try {
            await mutation.mutateAsync(newValues)
            return '/plants'
        } catch (error) {
            console.error('Error creating plant:', error)
            return '/plants' // Return the redirect path even on error
        }
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

    if (isUserLoading) {
        return (
            <PageWrapper header={<PageHeader title="Add Plant" backButton={true} />}>
                <div>Loading...</div>
            </PageWrapper>
        )
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
