import Button from '@/components/ui/Button';
import { IconWarning } from '@/data/icons';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Page not found',
};

export default function NotFound() {
	return (
		<main className="grow flex flex-col gap-1 items-center justify-center">
			<IconWarning />
			<h1 className="text-3xl mt-6 mb-2">It seems like you are lost</h1>
			<p className="text-foreground-secondary mb-4 text-center">
				You have strayed too far from the path. But don&apos;t worry,
				<br className="hidden sm:block" />
				I&apos;ll get you right back on track!
			</p>
			<Button variant="link" href="/">
				Take me home
			</Button>
		</main>
	);
}
