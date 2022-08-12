import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <div
            onClick={() =>
                loginWithRedirect({
                    redirectUri: `${window.location.origin}/dashboard`,
                })
            }
            style={{
                paddingBottom: 10,
                paddingTop: 10,
                width: '100%',
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
            }}
        >
            <h3 style={{ paddingLeft: 10, marginRight: 10 }}>Login</h3>
        </div>
    )
}

export default LoginButton
