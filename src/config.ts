const domain = process.env.REACT_APP_AUTH_DOMAIN
    ? process.env.REACT_APP_AUTH_DOMAIN
    : ''

export const config = {
    backendApiUrl: process.env?.REACT_APP_LETS_GROW_API
        ? process.env.REACT_APP_LETS_GROW_API
        : 'http://localhost:7070',
    auth0: {
        domain: process.env.REACT_APP_AUTH_DOMAIN
            ? process.env.REACT_APP_AUTH_DOMAIN
            : '',
        clientId: process.env.REACT_APP_AUTH_CLIENT_ID
            ? process.env.REACT_APP_AUTH_CLIENT_ID
            : '',
        audience: process.env.REACT_APP_AUTH_AUDIENCE
            ? process.env.REACT_APP_AUTH_AUDIENCE
            : '',
        scope: 'read:current_user update:current_user_metadata',
        useRefreshTokens: true,
    },
}

export default config
