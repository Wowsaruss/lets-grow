import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from '../Profile'

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth0()
    return isAuthenticated ? (
        <div>
            <h1>DASHBOARD!</h1>
            <Profile user={user} />
        </div>
    ) : (
        <div>
            <h1>LOADING.........</h1>
        </div>
    )
}

export default Dashboard
