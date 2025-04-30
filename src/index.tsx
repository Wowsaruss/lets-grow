import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import reportWebVitals from './reportWebVitals'
import App from './App'

import './css/index.css'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
