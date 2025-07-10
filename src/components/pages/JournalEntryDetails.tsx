import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchJournalEntryById } from '../../services/journal_entries'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../../config'

const JournalEntryDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [entry, setEntry] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const fetchEntry = async () => {
            setLoading(true)
            setError(null)
            try {
                const token = await getAccessTokenSilently({ audience: config.auth0.audience })
                const found = await fetchJournalEntryById(id || '', token)
                setEntry(found)
            } catch (err: any) {
                setError('Failed to load journal entry')
            } finally {
                setLoading(false)
            }
        }
        fetchEntry()
    }, [id, getAccessTokenSilently])

    // Helper to format date as mm/dd/yyyy
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return ''
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')
        const yyyy = date.getFullYear()
        return `${mm}/${dd}/${yyyy}`
    }

    return (
        <PageWrapper header={<PageHeader title="Journal Entry Details" backButton={true} />}>
            {loading ? (
                <Loader />
            ) : error ? (
                <div style={{ color: 'red', margin: 32 }}>{error}</div>
            ) : !entry ? (
                <div style={{ margin: 32 }}>Entry not found.</div>
            ) : (
                <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: 32 }}>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Plant:</strong> {entry.plant?.commonName || ''}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Date:</strong> {formatDate(entry.date)}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Subject:</strong> {entry.subject}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Body:</strong>
                        <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{entry.body}</div>
                    </div>
                    <button onClick={() => navigate(-1)} style={{ marginTop: 24 }}>Back</button>
                </div>
            )}
        </PageWrapper>
    )
}

export default JournalEntryDetails 