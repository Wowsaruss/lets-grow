import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'

import './App.css'

function App() {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <a href="/login">Login Page</a>
                        </div>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <div>
                            <LoginButton />
                        </div>
                    }
                />
                <Route
                    path="home"
                    element={
                        <div>
                            <h1>You are logged in now!!</h1>
                            <a href="/profile">Profile</a>
                            <Profile />
                            <LogoutButton />
                        </div>
                    }
                />
            </Routes>
        </div>
    )
}

export default App
