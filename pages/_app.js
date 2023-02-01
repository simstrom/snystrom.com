import '@/styles/globals.css';
import cn from 'clsx';
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
		<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
			<div className={cn(inter.className, 'max-w-3xl mx-auto px-6 md:px-8')}>
				<Nav />
				<Component {...pageProps} />
				<Footer />
			</div>
		</ThemeProvider>
	);
}
