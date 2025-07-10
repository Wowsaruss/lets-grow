import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
    baseURL: config.backendApiUrl,
    headers: {
        'Content-type': 'application/json',
    },
});

export interface JournalEntry {
    id: number;
    userId: number;
    plantId: number;
    date: string;
    subject: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    plant?: { commonName: string };
}

export const fetchJournalEntries = async (token: string, plantId?: string | number): Promise<JournalEntry[]> => {
    const params: any = {};
    if (plantId) params.plantId = plantId;
    const response = await apiClient.get<JournalEntry[]>('/api/journal-entries', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
    return response.data;
};

export const createJournalEntry = async (data: Partial<JournalEntry>, token: string): Promise<JournalEntry> => {
    const response = await apiClient.post<JournalEntry>('/api/journal-entries', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchJournalEntryById = async (id: string, token: string): Promise<JournalEntry> => {
    const response = await apiClient.get<JournalEntry>(`/api/journal-entries/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}; 