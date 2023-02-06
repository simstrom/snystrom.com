import cn from 'clsx';
import { useState } from 'react';
import { client } from '../lib/contentful-server';

import ChangeViewButton from '../components/ChangeViewButton';
import Container from '../components/Container';
import { GridIcon, ListIcon } from '../components/Icons';
import ProjectCard from '../components/ProjectCard';
import ProjectListItem from '../components/ProjectListItem';
import InView from '../lib/InView';

export default function Projects({ projects }) {
	const [gridView, setGridView] = useState(true);

	return (
		<Container>
			<InView>
				<div className="mb-4">
					<h1 className="text-4xl">All Projects</h1>
					<p className="text-base text-secondary">
						I love building projects and practice my engineering skills. Here&apos;s an archive of
						things that I&apos;ve worked on.
					</p>

					<div className="flex gap-2 justify-end">
						<ChangeViewButton currentlyActive={gridView} handleViewChange={() => setGridView(true)}>
							<GridIcon />
						</ChangeViewButton>
						<ChangeViewButton
							currentlyActive={!gridView}
							handleViewChange={() => setGridView(false)}
						>
							<ListIcon />
						</ChangeViewButton>
					</div>
				</div>

				<div
					className={cn(gridView && 'sm:grid grid-cols-2', 'flex flex-col gap-4 mb-20 sm:mb-28')}
				>
					{!gridView
						? projects.map((project) => (
								<ProjectListItem key={project.fields.title} project={project.fields} />
						  ))
						: projects.map((project) => (
								<ProjectCard key={project.fields.title} project={project.fields} />
						  ))}
				</div>
			</InView>
		</Container>
	);
}

export async function getStaticProps() {
	const data = await client.getEntries({
		content_type: 'project',
	});

	return {
		props: {
			projects: data.items,
		},
	};
}
