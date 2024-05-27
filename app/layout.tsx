import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Source_Code_Pro as FontMono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Providers from './providers';

const GeneralSans = localFont({
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
	metadataBase: new URL('https://snystrom.com'),
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
		url: 'https://snystrom.com',
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
					'container max-w-screen-xl min-h-screen transition-colors ease-in-out duration-300',
					GeneralSans.variable,
					fontMono.variable
				)}
			>
				{/* <div className="fixed opacity-[0.04] dark:opacity-[0.02] -z-10 w-full h-full bg-[url('/grain.gif')] top-0 left-0 pointer-events-none" /> */}
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
