import React, { useState } from 'react'
import api from '../../services/api'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'

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
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      // 1. Register user in Auth0
      const res = await api.post('/users/auth0-register', form)
      const auth0Id = res.data.auth0UserId
      // 2. Register user in local DB
      await api.post('/users', { ...form, auth0Id })
      setSuccess('Registration successful! You can now log in.')
      setForm(initialState)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper header={<PageHeader title="Register" />}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
        <label>Username<input name="username" value={form.username} onChange={handleChange} required /></label><br />
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required /></label><br />
        <label>Password<input name="password" type="password" value={form.password} onChange={handleChange} required /></label><br />
        <label>Phone<input name="phone" value={form.phone} onChange={handleChange} required /></label><br />
        <label>First Name<input name="firstName" value={form.firstName} onChange={handleChange} required /></label><br />
        <label>Last Name<input name="lastName" value={form.lastName} onChange={handleChange} required /></label><br />
        <label>City<input name="city" value={form.city} onChange={handleChange} required /></label><br />
        <label>State<input name="state" value={form.state} onChange={handleChange} required /></label><br />
        <label>Address 1<input name="address1" value={form.address1} onChange={handleChange} required /></label><br />
        <label>Address 2<input name="address2" value={form.address2} onChange={handleChange} /></label><br />
        <label>Zipcode<input name="zipcode" value={form.zipcode} onChange={handleChange} required /></label><br />
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </form>
    </PageWrapper>
  )
} 