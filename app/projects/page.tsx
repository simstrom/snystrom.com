import ProjectView from '@/components/sections/projectView';
import PageHeader from '@/components/ui/pageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'A collection of my web projects and engineering work.',
};

export default function Projects() {
	return (
		<main className="grow flex flex-col justify-center pt-32 sm:pt-40">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
			/>
			<ProjectView />
		</main>
	);
}
