'use client';

import { IconCompass } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Project } from '@/lib/types';
import Button from './ui/button';
import ProjectCard from './ui/projectCard';
import ProjectListItem from './ui/projectListItem';

// TEMP DATA
const items = ['React', 'Node', 'Express', 'Postgres', 'Chakra', 'Sequelize', 'JavaScript'];
const projects = [
	{
		title: 'Loop Agile',
		description:
			'Arcade styled 2D space shooter game with unlimited levels and infinitely increasing difficulty. Has different enemy types and various power ups. Handles game saves locally to file. Built to solidify knowledge about object-oriented programming and learn to implement GUI for Java Apps.',
		image: '/images/webpic.png',
		skills: items,
		deployLink: 'https://snystrom.com',
		githubLink: 'https://github.com',
	},
] as Array<Project>;

export default function ProjectView() {
	const [isGridView, setIsGridView] = useState(true);

	return (
		<>
			<div className="flex px-2 pt-8 sm:pt-12 pb-12 text-sm font-medium uppercase tracking-wide text-foreground-secondary">
				<span className="border-r-2 pr-4 select-non opacity-60">View As</span>
				<button
					onClick={() => setIsGridView(true)}
					aria-label="Change to grid view"
					className={cn(
						'pl-4 uppercase tracking-wide font-medium hover:text-foreground transition',
						isGridView && 'text-brand'
					)}
				>
					Grid
				</button>
				<button
					onClick={() => setIsGridView(false)}
					aria-label="Change to list view"
					className={cn(
						'pl-4 uppercase tracking-wide font-medium hover:text-foreground transition',
						!isGridView && 'text-brand'
					)}
				>
					List
				</button>
			</div>

			<AnimatePresence mode="wait">
				{isGridView ? (
					<motion.div
						key="grid-view"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							ease: 'easeOut',
						}}
						className="grid grid-cols-1 md:grid-cols-12 gap-4 h-fit"
					>
						<ProjectCard project={projects[0]} variant="featured" />

						{/* SIDE CONTENT */}
						<div className="relative overflow-hidden hidden lg:flex lg:col-span-3 flex-col justify-center rounded-2xl w-full lg:min-h-[360px] border bg-background-tertiary/50 shadow-shadow backdrop-blur-md group/card">
							<div className="flex-1 flex flex-col justify-center px-5 py-10">
								<h3 className="text-lg tracking-tight">
									<span className="text-brand text-lg mr-2">‣</span>
									My Expertise
								</h3>
								<p className="text-pretty text-foreground-secondary pt-3">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusamus suscipit
									ipsam voluptas. Porro dolorum laudantium neque corporis, enim officia tenetur
									itaque unde optio soluta, nostrum placeat sed ab quasi!
								</p>
							</div>
							<div className="border-t py-4 bg-background-secondary/50 flex">
								<Button variant="link" href="/about" className="ml-auto pr-7 h-fit">
									Get to know me more
								</Button>
							</div>

							<div className="absolute -z-10 -top-10 -right-14 text-background-secondary/50 -rotate-12 animate-wiggle [animation-play-state:paused] group-hover/card:[animation-play-state:running]">
								<IconCompass width={200} height={200} />
							</div>
						</div>

						<ProjectCard project={projects[0]} variant="small" />
						<ProjectCard project={projects[0]} variant="reversed" />
					</motion.div>
				) : (
					<motion.div
						key="list-view"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							ease: 'easeOut',
						}}
						className="flex flex-col gap-6 h-fit px-3"
					>
						<ProjectListItem project={projects[0]} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
