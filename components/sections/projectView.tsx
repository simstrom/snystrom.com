'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { projectsData } from '@/lib/data';
import ProjectCard from '../ui/projectCard';
import ProjectListItem from '../ui/projectListItem';
import TabList from '../ui/tabList';

enum Views {
	Grid = 0,
	List = 1,
}

export default function ProjectView() {
	const [activeView, setActiveView] = useState<Views>(Views.Grid);

	return (
		<>
			<TabList
				labels={['Grid', 'List']}
				selected={activeView}
				setSelected={setActiveView}
				className="my-8 sm:pt-12"
			/>

			<AnimatePresence>
				{activeView === Views.Grid ? (
					<motion.div
						key="grid-view"
						className="grid grid-cols-1 md:grid-cols-12 gap-4 h-fit animate-slide"
					>
						<ProjectCard project={projectsData[0]} variant="featured" />
						<ProjectCard project={projectsData[1]} variant="small" />
						<ProjectCard project={projectsData[2]} variant="reversed" />

						{projectsData.slice(3).map((project, index) => {
							const projectCounter = index % 4;
							const variant =
								projectCounter === 0
									? 'standard'
									: projectCounter === 1 || projectCounter === 2
									? 'small'
									: 'reversed';
							return <ProjectCard key={project.title} project={project} variant={variant} />;
						})}
					</motion.div>
				) : (
					<motion.div key="list-view" className="flex flex-col h-fit animate-slide">
						{projectsData.map((project) => (
							<ProjectListItem key={project.title} project={project} />
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
