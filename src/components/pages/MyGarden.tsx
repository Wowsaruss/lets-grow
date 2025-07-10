import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PageWrapper from '../PageWrapper'
import PageHeader from '../PageHeader'
import Loader from '../Loader'
import PlantService from '../../services/plants'
import UserPlantService from '../../services/user_plants'
import UserService from '../../services/users'
import { User } from '../../shared/types/User'
import { Plant } from '../../shared/types/Plants'
import { fetchJournalEntries, JournalEntry, createJournalEntry } from '../../services/journal_entries'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { TableNode } from '@table-library/react-table-library/types/table'
import Button from '../Button'

interface UserPlant {
    id: string
    userId: string
    plantId: string
    createdAt: string
    updatedAt: string
}

const MyGarden = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [userPlantDetails, setUserPlantDetails] = useState<Plant[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [deletingPlantId, setDeletingPlantId] = useState<string | null>(null)
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
    const [loadingJournal, setLoadingJournal] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [form, setForm] = useState({ plantId: '', date: '', subject: '', body: '' })
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) return

        const fetchData = async () => {
            setLoading(true)
            try {
                // Get current user from database
                const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
                const dbUser = await UserService.getCurrentUser(token)
                setCurrentUser(dbUser)

                const userPlants = await PlantService.fetchUserPlants(dbUser.id, token)
                setUserPlantDetails(userPlants)

                // Fetch journal entries
                const entries = await fetchJournalEntries(token)
                setJournalEntries(entries)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
                setLoadingJournal(false)
            }
        }

        fetchData()
    }, [isAuthenticated, getAccessTokenSilently])

    const handleDeletePlant = async (plantId: string) => {
        if (!currentUser) return

        // Find the plant name for the confirmation dialog
        const plant = userPlantDetails.find(p => p.id === plantId)
        if (!plant) return

        // Ask for confirmation
        const isConfirmed = window.confirm(
            `Are you sure you want to remove "${plant.commonName}" from your garden?`
        )

        if (!isConfirmed) return

        setDeletingPlantId(plantId)
        try {
            const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })

            // Find the user_plant record to get its ID
            const userPlantsRes = await UserPlantService.fetchByUserId(currentUser.id, token)
            const userPlant = userPlantsRes.find(up => up.plantId === plantId)

            if (!userPlant) {
                alert('Plant not found in your garden')
                return
            }

            // Delete the user_plant record
            await UserPlantService.deleteUserPlant(userPlant.id, token)

            // Remove the plant from the local state
            setUserPlantDetails(prev => prev.filter(plant => plant.id !== plantId))

            alert('Plant removed from your garden!')
        } catch (error) {
            console.error('Error deleting plant from garden:', error)
            alert('Failed to remove plant from garden. Please try again.')
        } finally {
            setDeletingPlantId(null)
        }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAddEntry = async (e: React.FormEvent) => {
        e.preventDefault()
        setAdding(true)
        setError(null)
        try {
            const token = await getAccessTokenSilently({ audience: 'https://lets-grow-api/' })
            await createJournalEntry({ ...form, plantId: Number(form.plantId) }, token)
            setForm({ plantId: '', date: '', subject: '', body: '' })
            setShowAddForm(false)
            // Refresh journal entries
            setLoadingJournal(true)
            const entries = await fetchJournalEntries(token)
            setJournalEntries(entries)
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Failed to add journal entry')
        } finally {
            setAdding(false)
            setLoadingJournal(false)
        }
    }

    const theme = useTheme(getTheme())
    // Map journalEntries to TableNode (id as string)
    const journalData = { nodes: journalEntries.map(entry => ({ ...entry, id: String(entry.id) })) }
    const journalColumns = [
        {
            label: 'Plant',
            renderCell: (node: TableNode) => (node as unknown as JournalEntry).plant?.commonName || '',
        },
        {
            label: 'Date',
            renderCell: (node: TableNode) => (node as unknown as JournalEntry).date,
        },
        {
            label: 'Subject',
            renderCell: (node: TableNode) => (node as unknown as JournalEntry).subject,
        },
    ]

    return (
        <PageWrapper header={<PageHeader title="My Garden" />}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2>Your Plants</h2>
                    {userPlantDetails.length === 0 ? (
                        <p>You have not added any plants to your garden yet.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {userPlantDetails.map((plant) => (
                                <li
                                    key={plant.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px',
                                        margin: '5px 0',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        backgroundColor: '#f9f9f9'
                                    }}
                                >
                                    <span>{plant.commonName}</span>
                                    <button
                                        onClick={() => handleDeletePlant(plant.id)}
                                        disabled={deletingPlantId === plant.id}
                                        style={{
                                            backgroundColor: '#ff4444',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '3px',
                                            cursor: deletingPlantId === plant.id ? 'not-allowed' : 'pointer',
                                            opacity: deletingPlantId === plant.id ? 0.6 : 1
                                        }}
                                    >
                                        {deletingPlantId === plant.id ? 'Removing...' : 'Remove'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}


                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 48 }}>
                        <h2>Journal</h2>
                        <Button
                            title={showAddForm ? 'Cancel' : 'Add Entry'}
                            onPress={() => setShowAddForm(f => !f)}
                            type="button"
                            variant="primary"
                        />
                    </div>
                    {showAddForm && (
                        <form onSubmit={handleAddEntry} style={{ marginBottom: 24, background: '#f9f9f9', padding: 16, borderRadius: 8, border: '1px solid #eee' }}>
                            <div style={{ marginBottom: 8 }}>
                                <label>Plant:{' '}
                                    <select name="plantId" value={form.plantId} onChange={handleFormChange} required>
                                        <option value="">Select a plant</option>
                                        {userPlantDetails.map(plant => (
                                            <option key={plant.id} value={plant.id}>{plant.commonName}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>Date:{' '}
                                    <input type="date" name="date" value={form.date} onChange={handleFormChange} required />
                                </label>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>Subject:{' '}
                                    <input type="text" name="subject" value={form.subject} onChange={handleFormChange} required />
                                </label>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <label>Body:{' '}
                                    <textarea name="body" value={form.body} onChange={handleFormChange} required rows={3} style={{ width: '100%' }} />
                                </label>
                            </div>
                            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
                            <button type="submit" disabled={adding}>{adding ? 'Adding...' : 'Add Entry'}</button>
                        </form>
                    )}
                    {loadingJournal ? (
                        <Loader />
                    ) : journalEntries.length === 0 ? (
                        <p>You have no journal entries yet.</p>
                    ) : (
                        <CompactTable
                            columns={journalColumns}
                            data={journalData}
                            theme={theme}
                        />
                    )}
                </>
            )}
        </PageWrapper>
    )
}

export default MyGarden 