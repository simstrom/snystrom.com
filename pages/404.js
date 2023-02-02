import Container from '@/components/Container';
import Link from 'next/link';
import { RightArrowIcon } from '../components/Icons';

export default function Custom404() {
	return (
		<Container>
			<div className="flex flex-col gap-2 mt-20 items-center">
				<div className="text-sm font-semibold tracking-widest uppercase text-gray-600 dark:text-gray-400">
					404 - Page Not Found
				</div>
				<h1 className="text-6xl font-semibold tracking-tight">Oh no!</h1>
				<h2 className="text-2xl text-gray-600 dark:text-gray-400 tracking-tight">
					It looks like you have strayed too far.
				</h2>
				<p>Don&apos;t you worry, I&apos;m here to take you back.</p>

				<Link href="/" className="flex items-center gap-1 group mt-12">
					<div className="text-emerald-500 font-medium">Take me Home</div>
					<div className="group-hover:translate-x-2 transition-transform duration-300">
						<RightArrowIcon color="#10b981" />
					</div>
				</Link>
			</div>
		</Container>
	);
}
