import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { produce } from 'immer'

import { CreateNoteDto } from '@/types/note'

type NoteDraftStore = {
	draft: CreateNoteDto
	setDraft: (note: CreateNoteDto) => void
	clearDraft: () => void
}

const initialDraft: CreateNoteDto = {
	title: '',
	content: '',
	tag: 'Todo',
}

export const useNoteDraftStore = create<NoteDraftStore>()(
	persist(
		(set) => {
			return {
				draft: initialDraft,
				setDraft: (note) => {
					set(
						produce((state: NoteDraftStore) => {
							state.draft = note
						}),
					)
				},
				clearDraft: () => {
					set(
						produce((state: NoteDraftStore) => {
							state.draft = initialDraft
						}),
					)
				},
			}
		},
		{
			name: 'note-draft-store',
			partialize: (state) => {
				return {
					draft: state.draft,
				}
			},
		},
	),
)

export const selectDraft = (state: NoteDraftStore) => state.draft

export const selectSetDraft = (state: NoteDraftStore) => state.setDraft

export const selectClearDraft = (state: NoteDraftStore) => state.clearDraft

