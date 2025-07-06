import { useAuth0 } from '@auth0/auth0-react'
import '../css/App.css'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <div
            onClick={() =>
                loginWithRedirect({
                    redirectUri: `${window.location.origin}/my-garden`,
                })
            }
            className="Link-inactive"
        >
            <h3 style={{ paddingLeft: 10, marginRight: 10 }}>Login</h3>
        </div>
    )
}

export default LoginButton
