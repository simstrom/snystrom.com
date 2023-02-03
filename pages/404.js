import Container from '@/components/Container';
import Link from 'next/link';
import { RightArrowIcon } from '../components/Icons';

export default function Custom404() {
	return (
		<Container>
			<div className="flex flex-col gap-2 mt-20 sm:items-center">
				<div className="text-sm font-semibold tracking-widest uppercase text-secondary">
					404 - Page Not Found
				</div>
				<h1 className="text-4xl">Oh no!</h1>
				<h2 className="text-lg sm:text-xl text-secondary">
					It looks like you have strayed too far.
				</h2>
				<p className="text-sm sm:text-base">
					Don&apos;t you worry, I&apos;m here to take you back.
				</p>

				<Link
					href="/"
					className="flex items-center gap-1 group rounded-lg px-6 py-3 mt-12 text-sm text-brand bg-brand/5 hover:bg-brand/10 duration-300"
				>
					<div className="font-medium">Take me Home</div>
					<div className="ml-auto group-hover:translate-x-2 transition-transform duration-300">
						<RightArrowIcon />
					</div>
				</Link>
			</div>
		</Container>
	);
}
