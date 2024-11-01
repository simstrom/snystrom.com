import Button from '@/components/ui/button';
import { Metadata } from 'next';
import Image from 'next/image';
import moonlight from '../public/images/moonlight.svg';

export const metadata: Metadata = {
	title: 'Page not found',
};

export default function NotFound() {
	return (
		<main className="grow flex pt-32 sm:pt-20 flex-col gap-1 items-center justify-center">
			<Image src={moonlight} alt="Illustration of a camper in the forest" draggable={false} />
			<h1 className="text-3xl mt-6 mb-2">It seems like you are lost</h1>
			<p className="text-foreground-secondary mb-4 text-center">
				You have strayed too far from the path. But don&apos;t worry,
				<br className="hidden sm:block" />
				we&apos;ll get you right back on track!
			</p>
			<Button variant="link" href="/">
				Take me home
			</Button>
		</main>
	);
}
