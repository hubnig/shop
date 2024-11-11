import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
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

			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MantineProvider>
					<Header />
					<main>{children}</main>
					<Footer />
				</MantineProvider>
			</body>
		</html>
	)
}
