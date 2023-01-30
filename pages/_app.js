import '@/styles/globals.css';

import { Inter } from '@next/font/google';
import localFont from '@next/font/local';
// import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });
const satoshi = localFont({
	src: '../public/fonts/Satoshi-Variable.woff2',
	variable: '--font-satoshi',
});

export default function App({ Component, pageProps }) {
	return (
		// <ThemeProvider attribute="class">
		<main className={`${satoshi.className} ${inter.className}`}>
			<Component {...pageProps} />
		</main>
		// </ThemeProvider>
	);
}
