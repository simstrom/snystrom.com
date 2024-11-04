import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono as FontMono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Providers from './providers';

const fontSans = localFont({
	src: '../public/fonts/GeneralSans-Variable.woff2',
	display: 'swap',
	weight: '300 800',
	variable: '--font-sans',
});
const fontMono = FontMono({
	subsets: ['latin'],
	display: 'swap',
	weight: '400',
	variable: '--font-mono',
});

export const viewport: Viewport = {
	maximumScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://snystrom.com'),
	title: {
		default: 'Simon Nyström | Web developer and Photographer',
		template: '%s | Simon Nyström',
	},
	description: 'Frontend engineer with a passion for UI/UX design and photography.',
	keywords:
		'snystrom, simon nyström, simstrom, web developer, frontend, ui design, adventure photography',
	openGraph: {
		type: 'website',
		siteName: 'Simon Nyström',
		locale: 'en_US',
		alternateLocale: 'en_SE',
		title: 'Simon Nyström | Web developer and Photographer',
		description: 'Frontend engineer with a passion for UI/UX design and photography.',
		url: process.env.NEXT_PUBLIC_SITE_URL,
		// images:
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Simon Nyström | Web developer and Photographer',
		description: 'Frontend engineer with a passion for UI/UX design and photography.',
		// images:
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	referrer: 'origin',
	icons: '/favicon.ico',
	alternates: {
		types: {
			'application/rss+xml': [
				{
					title: 'Blog RSS Feed',
					url: `${process.env.NEXT_PUBLIC_SITE_URL}/rss.xml`,
				},
			],
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					'container max-w-screen-lg min-h-screen flex flex-col',
					fontSans.variable,
					fontMono.variable
				)}
			>
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
				<Script
					src="https://analytics.eu.umami.is/script.js"
					data-website-id="0ab801df-b78b-462a-80b5-4630493addc6"
				/>
			</body>
		</html>
	);
}
