import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'

import './App.css'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => (
    <div>
        <h1>HOME!</h1>
    </div>
)

const About = () => (
    <div>
        <h1>ABOUT!</h1>
    </div>
)

const Dashboard = () => (
    <div>
        <h1>DASHBOARD!</h1>
        <Profile />
    </div>
)

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
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </ul>
        </nav>
    )
}

function App() {
    return (
        <div>
            <TopNavigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default App
