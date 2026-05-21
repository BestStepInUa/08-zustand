import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { fetchNoteById } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client'
import { ogDescriptionTruncate } from '@/app/helpers/ogDescriptionTruncate'

type NoteDetailsProps = {
	params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: NoteDetailsProps): Promise<Metadata> => {
	const { id } = await params
	const note = await fetchNoteById(id)

	return {
		title: note.title,
		description: note.content,
		openGraph: {
			type: 'article',
			url: `${process.env.NEXT_OG_APP_URL}/notes/${id}` || `http://localhost:3000/notes/${id}`,
			title: note.title,
			description: ogDescriptionTruncate(note.content),
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
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
	const { id } = await params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById(id),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	)
}
