import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import Navbar from '@/components/navbar';
import Providers from './providers';
import Transition from './template';

const GeneralSans = localFont({
	src: '../public/fonts/GeneralSans-Variable.woff2',
	display: 'swap',
	weight: '300 800',
	variable: '--font-sans',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://snystrom.com'),
	title: 'Simon Nyström - Frontend Engineer and Photographer',
	description: 'Frontend developer with a passion for UI/UX design and photography.',
	keywords: 'snystrom, simon nyström, simstrom',
	robots: 'index, follow',
	referrer: 'origin',
	icons: '/favicon.ico',
	openGraph: {
		type: 'website',
		siteName: 'Simon Nyström',
		locale: 'en_US',
		alternateLocale: 'en_SE',
		title: 'Simon Nyström - Frontend Engineer and Photographer',
		description: 'Frontend developer with a passion for UI/UX design and photography.',
		url: 'https://snystrom.com',
		// images:
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Simon Nyström - Frontend Engineer and Photographer',
		description: 'Frontend developer with a passion for UI/UX design and photography.',
		// images:
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
					'container max-w-screen-xl min-h-screen transition-colors ease-in-out duration-300 bg-background',
					// "bg-[url('/rainbow.svg')] bg-no-repeat bg-top",
					GeneralSans.variable
				)}
			>
				<div className="fixed opacity-[0.04] dark:opacity-[0.03] -z-10 w-full h-full bg-[url('/grain.gif')] top-0 left-0 pointer-events-none" />
				<Providers>
					<Navbar />
					<Transition>{children}</Transition>
				</Providers>
				<Script
					src="https://analytics.eu.umami.is/script.js"
					data-website-id="0ab801df-b78b-462a-80b5-4630493addc6"
				/>
			</body>
		</html>
	);
}
