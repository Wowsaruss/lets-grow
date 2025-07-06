import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { config } from '../config'

const Auth0ProviderWithHistory = ({ children }: any) => {
    const location = useNavigate()

    const onRedirectCallback = (appState: any) => {
        location(appState?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider
            domain={config.auth0.domain}
            clientId={config.auth0.clientId}
            audience={config.auth0.audience}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens={config.auth0.useRefreshTokens}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory
