import {
    Routes,
    Route,
    Navigate,
    useLocation,
    Outlet,
    NavLink,
} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import './css/App.css'
import Plants from './components/pages/Plants'
import PlantDetails from './components/pages/PlantDetails'
import AddPlant from './components/pages/AddPlant'
import EditPlant from './components/pages/EditPlant'
import Logo from './assets/Logo.png'

function MainNavigation() {
    const { isAuthenticated } = useAuth0()

    return (
        <nav
            style={{
                zIndex: 10,
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
                }}
            >
                <a
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 25,
                        marginBottom: 25,
                    }}
                    href="/"
                >
                    <img src={Logo} alt="Logo" width="100px" height="100px" />
                </a>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'Link-active' : 'Link-inactive'
                    }
                >
                    <h3 style={{ paddingLeft: 10, marginRight: 10 }}>Home</h3>
                </NavLink>
                {isAuthenticated ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? 'Link-active' : 'Link-inactive'
                            }
                        >
                            <h3 style={{ paddingLeft: 10, marginRight: 10 }}>
                                Dashboard
                            </h3>
                        </NavLink>
                        <NavLink
                            to="/plants"
                            className={({ isActive }) =>
                                isActive ? 'Link-active' : 'Link-inactive'
                            }
                        >
                            <h3 style={{ paddingLeft: 10, marginRight: 10 }}>
                                Plants
                            </h3>
                        </NavLink>
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
            <MainNavigation />

            <div style={{ paddingLeft: 150, width: '100%' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plants" element={<Plants />} />
                    <Route path="/plants/:plantId" element={<PlantDetails />} />
                    <Route path="/plants/new" element={<AddPlant />} />
                    <Route
                        path="/plants/:plantId/edit"
                        element={<EditPlant />}
                    />
                    <Route element={<RequireAuth />}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}

function RequireAuth() {
    const { isAuthenticated } = useAuth0()
    const location = useLocation()

    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return <Outlet />
}

export default App
