import { IconPerson } from '@/lib/icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Simon Nyström - Projects',
};

export default function Projects() {
	return (
		<main className="flex min-h-screen h-[2000px] flex-col items-center justify-center p-24">
			<div className="flex flex-col gap-2 font-serif">
				<IconPerson />
				Projects Page
			</div>
		</main>
	);
}
