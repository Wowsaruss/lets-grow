import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import App from './App'

import './index.css'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <App />
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
