import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
    const { logout } = useAuth0()

    return (
        <div
            onClick={() => logout({ returnTo: window.location.origin })}
            style={{
                paddingBottom: 10,
                paddingTop: 10,
                width: '100%',
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
            }}
        >
            <h3 style={{ paddingLeft: 10, marginRight: 10 }}>Logout</h3>
        </div>
    )
}

export default LogoutButton
