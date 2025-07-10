import { useAuth0 } from '@auth0/auth0-react'
import Button from './Button'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <Button
            title="Sign Up"
            onPress={() =>
                loginWithRedirect({
                    redirectUri: `${window.location.origin}/my-garden`,
                })
            }
            type="button"
        />
    )
}

export default LoginButton
