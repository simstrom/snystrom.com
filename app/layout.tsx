import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from '@/data/constants';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist_Mono as FontMono } from 'next/font/google';
import localFont from 'next/font/local';
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
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		images: {
			url: '/images/og.webp',
			width: 1600,
			height: 836,
			alt: SITE_DESCRIPTION,
			type: 'image/png',
		},
		locale: 'en_US',
		alternateLocale: 'en_SE',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: { url: '/images/og.webp', width: 1600, height: 836, alt: SITE_DESCRIPTION },
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	manifest: '/manifest.webmanifest',
	referrer: 'origin',
	icons: '/favicon.ico',
	alternates: {
		types: {
			'application/rss+xml': [
				{
					title: 'Blog RSS Feed',
					url: `${SITE_URL}/rss.xml`,
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
					'min-h-screen max-w-[1088px] mx-auto flex flex-col',
					fontSans.variable,
					fontMono.variable
				)}
			>
				<Providers>
					<Navbar />
					<div className="grid flex-1 grid-cols-1 lg:grid-cols-[32px_1fr_32px]">
						<div className="hidden lg:block w-full border-x opacity-75 bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px]" />
						{children}
						<div className="hidden lg:block w-full border-x opacity-75 bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px]" />
					</div>
					<Footer />
				</Providers>
				{/* <Script
					src="https://analytics.eu.umami.is/script.js"
					data-website-id="0ab801df-b78b-462a-80b5-4630493addc6"
				/> */}
			</body>
		</html>
	);
}
