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
            style={{marginBottom: 10}}
        >
            Login
        </div>
    )
}

export default LoginButton
