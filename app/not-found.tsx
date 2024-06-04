import Button from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Page not found',
};

export default function NotFound() {
	return (
		<main className="flex h-[70vh] pt-32 sm:pt-40 flex-col gap-1 items-center justify-center">
			<span className="font-mono text-xs uppercase tracking-wide text-foreground-secondary">
				Feeling lost?
			</span>
			<h1 className="text-xl mb-2">Page not found</h1>
			<p className="text-sm leading-7 text-foreground-secondary mb-4 text-center">
				I could not find what you&apos;re looking for... but it&apos;s alright,
				<br className="hidden sm:block" />
				we&apos;ll get you right back on track!
			</p>
			<Button size="small" href="/">
				Take me home
			</Button>
		</main>
	);
}
