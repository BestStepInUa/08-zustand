import TanStackProvider from '@/components/TanStackProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import 'modern-normalize'
import './globals.css'

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang='en'>
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
