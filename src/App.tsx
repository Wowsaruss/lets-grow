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
        <nav
            style={{
                position: 'fixed',
                height: '100%',
                width: 150,
                backgroundColor: '#f4edcd',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    marginLeft: 15,
                    marginTop: 15,
                }}
            >
                <img
                    src="https://github.com/Wowsaruss/lets-grow/blob/master/src/Grow-PNG-HD.png"
                    alt=""
                    width="100px"
                    height="100px"
                />
                <Link to="/" style={{ marginBottom: 10 }}>
                    Home
                </Link>
                <Link to="/about" style={{ marginBottom: 10 }}>
                    About
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" style={{ marginBottom: 10 }}>
                            Dashboard
                        </Link>
                        <Link to="/plants" style={{ marginBottom: 10 }}>
                            Plants
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <LoginButton />
                    </>
                )}
            </div>
        </nav>
    )
}

function NotFound() {
    return <>!!!!!!!!!!!NOT FOUND!!!!!!!!!!!</>
}

function App() {
    return (
        <div style={{ display: 'flex' }}>
            <TopNavigation />

            <div style={{ paddingLeft: 150 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plants" element={<Plants />} />
                    {/* I need to eventually figure out how to fix the RequireAuth route wrapper */}
                    <Route element={<RequireAuth />}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
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
