'use client'

import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createNote } from '@/lib/api'

import css from './NoteForm.module.css'
import {
	useNoteDraftStore,
	selectDraft,
	selectSetDraft,
	selectClearDraft,
} from '@/lib/stores/noteStore'

const ValidationCreateNoteFormSchema = Yup.object().shape({
	title: Yup.string()
		.min(3, 'Title must be at least 3 characters')
		.max(50, 'Title must be at most 50 characters')
		.required('Title is required'),
	content: Yup.string().max(500, 'Content must be at most 500 characters'),
	tag: Yup.string()
		.oneOf(
			['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
			'Tag must be one of: Todo, Work, Personal, Meeting, Shopping',
		)
		.required('Tag is required'),
})

interface FormData {
	title: string
	content: string
	tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
}

export default function NoteForm() {
	const router = useRouter()

	const draft = useNoteDraftStore(selectDraft)
	const setDraft = useNoteDraftStore(selectSetDraft)
	const clearDraft = useNoteDraftStore(selectClearDraft)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		setDraft({
			...draft,
			[name]: value,
		})
	}

	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: createNote,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['notes'],
				exact: false,
			})
			clearDraft()
			router.back()
		},
	})

	const handleSubmit = async (formData: globalThis.FormData) => {
		const values: FormData = {
			title: String(formData.get('title')),
			content: String(formData.get('content') || ''),
			tag: formData.get('tag') as FormData['tag'],
		}

		try {
			await ValidationCreateNoteFormSchema.validate(values, {
				abortEarly: false,
			})

			mutation.mutate(values)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form action={handleSubmit} className={css.form}>
			<div className={css.formGroup}>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					defaultValue={draft?.title}
					onChange={handleChange}
					className={css.input}
				/>
			</div>

			<div className={css.formGroup}>
				<label htmlFor='content'>Content</label>
				<textarea
					id='content'
					name='content'
					defaultValue={draft?.content}
					onChange={handleChange}
					rows={8}
					className={css.textarea}
				/>
			</div>

			<div className={css.formGroup}>
				<label htmlFor='tag'>Tag</label>
				<select
					id='tag'
					name='tag'
					defaultValue={draft?.tag || 'Todo'}
					onChange={handleChange}
					className={css.input}
				>
					<option value=''>Select a tag</option>
					<option value='Todo'>Todo</option>
					<option value='Work'>Work</option>
					<option value='Personal'>Personal</option>
					<option value='Meeting'>Meeting</option>
					<option value='Shopping'>Shopping</option>
				</select>
			</div>

			<div className={css.actions}>
				<button type='button' className={css.cancelButton} onClick={() => router.back()}>
					Cancel
				</button>
				<button type='submit' className={css.submitButton} disabled={mutation.isPending}>
					Create note
				</button>
			</div>
		</form>
	)
}
