import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'

type NotesProps = {
	params: Promise<{ slug: string[] }>
}

export const generateMetadata = async ({ params }: NotesProps): Promise<Metadata> => {
	const { slug } = await params
	const tag = slug[0] === 'all' ? undefined : slug[0]

	return {
		title: tag ? `Recent Notes | ${tag} ` : 'Recent Notes',
		description: tag ? `A list of recent notes by filter: ${tag}` : 'A list of all recent notes.',
		openGraph: {
			type: 'website',
			url:
				`${process.env.NEXT_OG_APP_URL}/notes/filter/${slug[0]}` ||
				`http://localhost:3000/notes/filter/${slug[0]}`,
			title: tag ? `Recent Notes | ${tag} ` : 'Recent Notes',
			description: tag ? `A list of recent notes by filter: ${tag}` : 'A list of all recent notes.',
			siteName: 'BestNotes App',
			images: [
				{
					url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
					width: 1536,
					height: 1024,
					alt: tag ? `BestNotes App - Recent Notes | ${tag}` : 'BestNotes App - Recent Notes',
				},
			],
		},
	}
}

export default async function Notes({ params }: NotesProps) {
	const queryClient = new QueryClient()

	const { slug } = await params
	const tag = slug[0] === 'all' ? undefined : slug[0]

	await queryClient.prefetchQuery({
		queryKey: ['notes', '', tag, 1],
		queryFn: () => fetchNotes({ searchText: '', tag, page: 1 }),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient tag={tag} />
		</HydrationBoundary>
	)
}
