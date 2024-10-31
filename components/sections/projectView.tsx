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

			<AnimatePresence mode="popLayout">
				{activeView === Views.Grid ? (
					<motion.div
						key="grid-view"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							ease: 'easeInOut',
						}}
						className="grid grid-cols-1 md:grid-cols-12 gap-4 h-fit"
					>
						<ProjectCard project={projectsData[0]} variant="featured" />

						{/* SIDE CONTENT */}
						{/* <div className="relative overflow-hidden hidden lg:flex lg:col-span-3 flex-col justify-center rounded-2xl w-full lg:min-h-[360px] border bg-background-tertiary group/card">
							<div className="flex-1 flex flex-col justify-center px-5 py-10">
								<h3>
									<span className="text-brand text-lg mr-2">‣</span>
									My Expertise
								</h3>
								<p className="text-sm leading-7 text-pretty text-foreground-secondary pt-3">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusamus suscipit
									ipsam voluptas. Porro dolorum laudantium neque corporis, enim officia tenetur
									itaque unde optio soluta, nostrum placeat sed ab quasi!
								</p>
							</div>
							<div className="border-t py-4 bg-background-secondary flex">
								<Button variant="link" href="/about" className="ml-auto pr-7 h-fit">
									Get to know me more
								</Button>
							</div>

							<div className="absolute -z-10 -top-10 -right-14 text-background-secondary -rotate-12 animate-wiggle [animation-play-state:paused] group-hover/card:[animation-play-state:running]">
								<IconCompass width={200} height={200} />
							</div>
						</div> */}

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
					<motion.div
						key="list-view"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							ease: 'easeInOut',
						}}
						className="flex flex-col h-fit"
					>
						{projectsData.map((project) => (
							<ProjectListItem key={project.title} project={project} />
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
