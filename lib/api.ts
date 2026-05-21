import axios from 'axios'

import { Note } from '@/types/note'

interface NotesResponse {
	notes: Note[]
	totalPages: number
}

const api = axios.create({
	baseURL: (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, ''),
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
	},
})

export const fetchNotes = async ({
	searchText,
	tag,
	page,
}: {
	searchText: string
	tag?: string
	page: number
}): Promise<{ notes: Note[]; totalPages: number }> => {
	const {
		data: { notes, totalPages },
	} = await api.get<NotesResponse>('/notes', {
		params: {
			search: searchText,
			tag,
			page: page,
			perPage: 12,
		},
	})

	return { notes, totalPages }
}

export const fetchNoteById = async (id: string): Promise<Note> => {
	const { data } = await api.get<Note>(`/notes/${id}`)

	return data
}

export const createNote = async (noteData: {
	title: string
	content: string
	tag: Note['tag']
}): Promise<Note> => {
	const { data } = await api.post<Note>('/notes', noteData)

	return data
}
export const deleteNote = async (id: string): Promise<Note> => {
	const { data } = await api.delete<Note>(`/notes/${id}`)

	return data
}
