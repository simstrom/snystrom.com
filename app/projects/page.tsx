import ProjectView from '@/components/projectView';
import PageHeader from '@/components/ui/pageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Simon Nyström - Projects',
};

export default function Projects() {
	return (
		<main className="flex flex-col justify-center mt-32 sm:mt-40">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
			/>
			<ProjectView />
		</main>
	);
}
