import '@/styles/globals.css';
import cn from 'clsx';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
			<div className={cn(inter.className, 'antialiased min-h-screen flex flex-col')}>
				<Nav />
				<Component {...pageProps} />
				<Footer />
			</div>
		</ThemeProvider>
	);
}
