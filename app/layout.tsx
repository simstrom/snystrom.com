import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import {
	PT_Mono as FontMono,
	Inter as FontSans,
	Playfair_Display as FontSerif,
} from 'next/font/google';

import Navbar from '@/components/navbar';
import Providers from './providers';

const fontSans = FontSans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
});
const fontSerif = FontSerif({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-serif',
});
const fontMono = FontMono({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400'],
	variable: '--font-mono',
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
					'max-w-4xl container min-h-screen font-sans antialiased bg-background transition-colors ease-in-out',
					"bg-[url('/rainbow.svg')] bg-no-repeat bg-top",
					fontSans.variable,
					fontMono.variable,
					fontSerif
				)}
			>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
