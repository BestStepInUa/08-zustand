import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import TanStackProvider from '@/components/TanStackProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import 'modern-normalize'
import './globals.css'

const robotoFont = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'BestNotes App',
	description: 'The best notes app for your daily needs.',
	openGraph: {
		type: 'website',
		url: process.env.NEXT_OG_APP_URL || 'http://localhost:3000',
		title: 'BestNotes App',
		description: 'The best notes app for your daily needs.',
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

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang='en' className={robotoFont.variable}>
			<body>
				<TanStackProvider>
					<Header />
					<main>
						{children}
						{modal}
					</main>
					<Footer />
				</TanStackProvider>
			</body>
		</html>
	)
}
