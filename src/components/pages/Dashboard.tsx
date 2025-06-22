import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from '../Profile'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth0()
    return (
        <PageWrapper header={<PageHeader title="Dashboard" />}>
            {isAuthenticated ? (
                <Profile user={user} />
            ) : (
                <Loader />
            )}
        </PageWrapper>
    )
}

export default Dashboard
