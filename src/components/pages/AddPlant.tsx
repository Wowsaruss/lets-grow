import { useMutation, useQuery } from 'react-query'
import { FormikValues } from 'formik'
import PlantService from '../../services/plants'
import { addEditMapping } from '../../helpers'
import PlantForm from '../PlantForm'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import { useAuth0 } from '@auth0/auth0-react'
import UserService from '../../services/users'
import { useEffect, useState } from 'react'
import { User as ApiUser } from '../../types/User'
import { Plant } from '../../types/Plants'

export default function AddPlant() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0()
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently({ audience: 'https://lets-grow-api/' }).then(setToken)
        }
    }, [isAuthenticated, getAccessTokenSilently])

    const { data: userData, isLoading: isUserLoading } = useQuery<ApiUser>(
        ['currentUser', token],
        () => token ? UserService.getCurrentUser(token) : Promise.reject('No token'),
        {
            enabled: !!token,
            retry: false,
        }
    )

    const mutation = useMutation(async (data) => {
        // Ensure we have a valid token before making the request
        if (!token) throw new Error('No token')
        return PlantService.createOne(data)
    })

    const HandleSubmit = async (values: any): Promise<string> => {
        if (!userData?.id) {
            console.error('No user data available')
            return '/plants' // Return the redirect path even on error
        }

        const newValues = await addEditMapping(values)
        newValues.authorId = userData.id

        try {
            await mutation.mutateAsync(newValues)
            return '/plants'
        } catch (error) {
            console.error('Error creating plant:', error)
            return '/plants' // Return the redirect path even on error
        }
    }

    const initialValues: FormikValues = {
        commonName: '',
        scientificName: '',
        description: '',
        plantFamilyId: undefined,
        plantTypeId: undefined,
        daysToGermination: undefined,
        daysToHarvest: undefined,
        indeterminate: false,
        germinationTempHigh: undefined,
        germinationTempLow: undefined,
        light: '',
        water: '',
        soil: '',
        perennial: false,
        heirloom: false,
        hybrid: false,
        openPollinated: false,
        selfPollinated: false,
        spacing: undefined,
        rowSpacing: undefined,
        pruning: '',
        sowingDepth: undefined,
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
