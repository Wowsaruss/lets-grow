import { useMutation, useQuery } from 'react-query'
import { Formik, Form, Field } from 'formik'
import PlantService from '../../services/plants'
import { addEditMapping } from '../../helpers'
import PlantForm from '../PlantForm'
import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import { useAuth0 } from '@auth0/auth0-react'
import UserService from '../../services/users'
import { useEffect, useState } from 'react'
import { UserRole, User as ApiUser } from '../../shared/types/User'
import { config } from '../../config'

export default function AddPlant() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0()
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently({ audience: config.auth0.audience }).then(setToken)
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

    const mutation = useMutation(async (data: { commonName: string, variety: string }) => {
        if (!token) throw new Error('No token')
        return PlantService.createWithAI(data.commonName, data.variety, token)
    })

    const handleSubmit = async (values: { commonName: string, variety: string }) => {
        try {
            await mutation.mutateAsync(values)
            window.location.href = '/plants'
        } catch (error) {
            alert('Error creating plant: ' + (error as any)?.message)
        }
    }

    if (isUserLoading) {
        return (
            <PageWrapper header={<PageHeader title="Add Plant" backButton={true} />}>
                <div>Loading...</div>
            </PageWrapper>
        )
    }

    if (!userData || userData.role !== UserRole.Admin) {
        return (
            <PageWrapper header={<PageHeader title="Add Plant" backButton={true} />}>
                <div style={{ padding: 32, textAlign: 'center', color: '#b71c1c', fontWeight: 600 }}>
                    Only admin users can add new plants.
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper header={<PageHeader title="Add Plant" backButton={true} />}>
            <Formik
                initialValues={{ commonName: '', variety: '' }}
                onSubmit={handleSubmit}
            >
                <Form style={{ width: 400, margin: '0 auto', marginTop: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <label>
                            Common Name:
                            <Field name="commonName" type="text" required style={{ marginLeft: 8, width: '100%' }} />
                        </label>
                        <label>
                            Variety:
                            <Field name="variety" type="text" required style={{ marginLeft: 8, width: '100%' }} />
                        </label>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#2d5a27',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: mutation.isLoading ? 'not-allowed' : 'pointer',
                                opacity: mutation.isLoading ? 0.6 : 1,
                                marginTop: 16
                            }}
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? 'Generating...' : 'Generate Plant with AI'}
                        </button>
                    </div>
                </Form>
            </Formik>
        </PageWrapper>
    )
}
