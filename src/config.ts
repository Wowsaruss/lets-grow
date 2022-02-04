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
    },
}
