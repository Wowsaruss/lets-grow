import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from '../Profile'
import PageWrapper from '../PageWrapper'

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth0()
    return (
        <PageWrapper
            header={
                <div
                    style={{
                        // position: 'fixed',
                        height: 70,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        boxShadow: '-5px 4px 10px #f2f2f2',
                        paddingLeft: 25,
                    }}
                >
                    <h1>Dashboard</h1>
                </div>
            }
        >
            {isAuthenticated ? (
                <Profile user={user} />
            ) : (
                <h1>LOADING.........</h1>
            )}
        </PageWrapper>
    )
}

export default Dashboard
