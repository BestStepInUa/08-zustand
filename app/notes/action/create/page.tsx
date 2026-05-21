import type { Metadata } from 'next'
import NoteForm from '@/components/NoteForm'
import css from './CreateNote.module.css'

export const metadata: Metadata = {
	title: 'Create Note - BestNotes App',
	description: 'Create a new note in the BestNotes App',
	openGraph: {
		type: 'website',
		url:
			`${process.env.NEXT_OG_APP_URL}/notes/action/create` ||
			`http://localhost:3000/notes/action/create`,
		title: 'Create Note - BestNotes App',
		description: 'Create a new note in the BestNotes App',
		siteName: 'BestNotes App',
		images: [
			{
				url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
				width: 1536,
				height: 1024,
				alt: 'BestNotes App',
			},
		],
	},
}

export default function CreateNote() {
	return (
		<div className={css.container}>
			<h1 className={css.title}>Create note</h1>
			<NoteForm />
		</div>
	)
}

