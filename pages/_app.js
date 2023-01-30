import '@/styles/globals.css';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });
// const satoshi = localFont({
// 	src: '../public/fonts/Satoshi-Variable.woff2',
// 	variable: '--font-satoshi',
// });

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class">
			<div className={`${inter.className}`}>
				<Nav />
				<Component {...pageProps} />
				<Footer />
			</div>
		</ThemeProvider>
	);
}
