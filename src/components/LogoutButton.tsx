import { useAuth0 } from '@auth0/auth0-react'
import '../css/App.css'

const LogoutButton = () => {
    const { logout } = useAuth0()

    return (
        <div
            onClick={() => logout({ returnTo: window.location.origin })}
            className="Link-inactive"
        >
            <h3 style={{ paddingLeft: 10, marginRight: 10 }}>Logout</h3>
        </div>
    )
}

export default LogoutButton
