import cn from 'clsx';
import { useState } from 'react';

import Container from '../components/Container';
import { GridIcon, ListIcon } from '../components/Icons';
import ProjectCard from '../components/ProjectCard';
import ProjectListItem from '../components/ProjectListItem';
import InView from '../lib/InView';

export default function Projects() {
	const [listView, setListView] = useState(false);

	return (
		<Container>
			<InView>
				<div className="mb-4">
					<h1 className="text-4xl">All Projects</h1>
					<p className="text-base text-secondary">
						I love building projects and practice my engineering skills. Here's an archive of things
						that I've worked on.
					</p>

					<div className="flex gap-2 justify-end">
						<div className="group relative flex justify-center">
							<button
								className={cn(
									'p-2 rounded-lg flex text-sm gap-2',
									!listView
										? 'bg-brand/10 text-brand'
										: 'text-tertiary hover:text-primary duration-300'
								)}
								onClick={() => setListView(false)}
							>
								<GridIcon />
							</button>
							{listView && (
								<span className="mb-1 absolute min-w-[75px] bottom-10 scale-0 rounded-lg bg-tertiary p-2 text-xs text-tertiary group-hover:scale-100 duration-300">
									Grid View
								</span>
							)}
						</div>
						<div className="group relative flex justify-center">
							<button
								className={cn(
									'p-2 rounded-lg flex text-sm gap-2',
									listView
										? 'bg-brand/10 text-brand'
										: 'text-tertiary hover:text-primary duration-300'
								)}
								onClick={() => setListView(true)}
							>
								<ListIcon />
							</button>
							{!listView && (
								<span className="mb-1 absolute min-w-[75px] bottom-10 scale-0 rounded-lg bg-tertiary p-2 text-xs text-tertiary group-hover:scale-100 duration-300">
									List View
								</span>
							)}
						</div>
					</div>
				</div>

				<div
					className={cn(!listView && 'sm:grid grid-cols-2', 'flex flex-col gap-4 mb-20 sm:mb-28')}
				>
					{listView ? (
						<>
							<ProjectListItem />
							<ProjectListItem />
							<ProjectListItem />
							<ProjectListItem />
						</>
					) : (
						<>
							<ProjectCard />
							<ProjectCard />
							<ProjectCard />
							<ProjectCard />
						</>
					)}
				</div>
			</InView>
		</Container>
	);
}
