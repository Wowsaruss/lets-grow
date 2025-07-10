import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import { config } from '../../config'

const initialState = {
  username: '',
  email: '',
  password: '',
  phone: '',
  firstName: '',
  lastName: '',
  city: '',
  state: '',
  address1: '',
  address2: '',
  zipcode: '',
}

export default function Register() {
  const { user: auth0User, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isAuth0User, setIsAuth0User] = useState(false)

  // Pre-fill form with Auth0 user data if available
  useEffect(() => {
    if (auth0User && isAuthenticated) {
      setIsAuth0User(true)
      setForm(prev => ({
        ...prev,
        email: auth0User.email || '',
        firstName: auth0User.given_name || auth0User.name?.split(' ')[0] || '',
        lastName: auth0User.family_name || auth0User.name?.split(' ').slice(1).join(' ') || '',
      }))
    }
  }, [auth0User, isAuthenticated])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      if (isAuth0User) {
        // For Auth0 users, just create the local database profile
        const token = await getAccessTokenSilently({ audience: config.auth0.audience })
        await api.post('/users', {
          ...form,
          auth0Id: auth0User?.sub,
          password: 'auth0-user' // Placeholder since Auth0 handles auth
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setSuccess('Profile completed successfully!')
        setTimeout(() => navigate('/my-garden'), 2000)
      } else {
        // For new users, create both Auth0 and local database accounts
        const res = await api.post('/users/auth0-register', form)
        const auth0Id = res.data.auth0UserId
        await api.post('/users', { ...form, auth0Id })
        setSuccess('Registration successful! You can now log in.')
        setForm(initialState)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper header={<PageHeader title={isAuth0User ? "Complete Profile" : "Register"} />}>
      <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #eee', padding: 32 }}>
        {isAuth0User && (
          <div style={{ marginBottom: 16, padding: 12, background: '#e3f2fd', borderRadius: 8, border: '1px solid #2196f3' }}>
            <p style={{ margin: 0, color: '#1976d2' }}>
              Welcome! Please complete your profile to continue.
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Username<input name="username" value={form.username} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required disabled={isAuth0User} /></label>
          </div>
          {!isAuth0User && (
            <div style={{ marginBottom: 12 }}>
              <label>Password<input name="password" type="password" value={form.password} onChange={handleChange} required /></label>
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <label>Phone<input name="phone" value={form.phone} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>First Name<input name="firstName" value={form.firstName} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Last Name<input name="lastName" value={form.lastName} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>City<input name="city" value={form.city} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>State<input name="state" value={form.state} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Address 1<input name="address1" value={form.address1} onChange={handleChange} required /></label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Address 2<input name="address2" value={form.address2} onChange={handleChange} /></label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Zipcode<input name="zipcode" value={form.zipcode} onChange={handleChange} required /></label>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, fontSize: 16 }}>
            {loading ? 'Processing...' : (isAuth0User ? 'Complete Profile' : 'Register')}
          </button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        </form>
      </div>
    </PageWrapper>
  )
} 