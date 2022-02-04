import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { config } from './config'

import './index.css'

ReactDOM.render(
    <Auth0Provider
        domain={config.auth0.domain}
        clientId={config.auth0.clientId}
        redirectUri={window.location.origin}
    >
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Auth0Provider>,
    document.getElementById('root')
)

reportWebVitals()
