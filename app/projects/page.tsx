import PageHeader from '@/components/ui/pageHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Simon Nyström - Projects',
};

export default function Projects() {
	return (
		<main className="flex min-h-screen flex-col items-center mt-40">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
			/>
		</main>
	);
}
