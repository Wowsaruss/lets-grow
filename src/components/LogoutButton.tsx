import { useAuth0 } from '@auth0/auth0-react'
import Button from './Button'

const LogoutButton = () => {
    const { logout } = useAuth0()

    return (
        <Button
            title="Logout"
            onPress={() => logout({ returnTo: window.location.origin })}
            type="button"
        />
    )
}

export default LogoutButton
