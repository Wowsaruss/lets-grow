import React from 'react'
import {
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
    Outlet,
} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Dashboard from './components/pages/Dashboard'
import About from './components/pages/About'
import Home from './components/pages/Home'
import './App.css'
import Plants from './components/pages/Plants'

function TopNavigation() {
    const { isAuthenticated } = useAuth0()

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/plants">Plants</Link>
                        </li>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <LoginButton />
                    </>
                )}
            </ul>
        </nav>
    )
}

function NotFound() {
    return <>!!!!!!!!!!!NOT FOUND!!!!!!!!!!!</>
}

function App() {
    return (
        <>
            <TopNavigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plants" element={<Plants />} />
                {/* I need to eventually figure out how to fix the RequireAuth route wrapper */}
                <Route element={<RequireAuth />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

// I need to eventually figure out how to fix the RequireAuth route wrapper
function RequireAuth() {
    const { isAuthenticated } = useAuth0()
    const location = useLocation()

    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return <Outlet />
}

export default App
