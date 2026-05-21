import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'

type NotesProps = {
	params: Promise<{ slug: string[] }>
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
			<NotesClient key={tag} tag={tag} />
		</HydrationBoundary>
	)
}
