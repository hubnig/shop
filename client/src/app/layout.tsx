import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ProviderLayout from './providerLayout'

const poppins = Poppins({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'KUPIKOD',
	description: 'shop video games',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={poppins.className}>
				<ProviderLayout>
					<Header />
					<main>{children}</main>
					<Footer />
				</ProviderLayout>
			</body>
		</html>
	)
}
