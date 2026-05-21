'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

import { fetchNoteById } from '@/lib/api'
import InterceptionModal from '@/components/InterceptionModal'

import css from './NotePreview.module.css'

export default function NotePreviewClient() {
	const { id } = useParams<{ id: string }>()

	const router = useRouter()
	const close = () => router.back()

	const {
		data: note,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	})

	if (isLoading) return <p>Loading...</p>

	if (error || !note) return <p>Some error..</p>

	const formattedDate = note.updatedAt
		? `Updated at: ${note.updatedAt}`
		: `Created at: ${note.createdAt}`

	return (
		<InterceptionModal onClose={close}>
			<div className={css.container}>
				<div className={css.item}>
					<div className={css.header}>
						<h2>{note.title}</h2>
					</div>
					<p className={css.tag}>{note.tag}</p>
					<p className={css.content}>{note.content}</p>
					<p className={css.date}>{formattedDate}</p>
				</div>
				<button type='button' className={css.backBtn} onClick={close}>
					Close
				</button>
			</div>
		</InterceptionModal>
	)
}

