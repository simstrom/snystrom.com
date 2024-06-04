'use client';

import { IconArrowUpRight, IconGithub } from '@/lib/icons';
import { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './button';
import CursorGlow from './cursorGlow';
import HorizontalScroller from './horizontalScroller';

interface ProjectCardProps {
	project: Project;
	variant?: 'featured' | 'standard' | 'reversed' | 'small';
	className?: string;
}

const renderButtons = (project: Project) => (
	<>
		{project.deployLink && (
			<Button aria-label="Visit deployed site" size="icon" isExternalLink href={project.deployLink}>
				<IconArrowUpRight />
			</Button>
		)}
		{project.githubLink && (
			<Button aria-label="View source code" size="icon" isExternalLink href={project.githubLink}>
				<IconGithub />
			</Button>
		)}
	</>
);

export default function ProjectCard({
	project,
	variant = 'standard',
	className,
}: ProjectCardProps) {
	const CardFooter: React.FC<ProjectCardProps> = ({ project }) => (
		<div className="border-t">
			<div className="relative overflow-hidden py-4 font-mono tracking-tight text-xs text-foreground-secondary bg-background-secondary rounded-b-2xl select-none">
				<HorizontalScroller items={project.stack} separator="•" />
			</div>
		</div>
	);

	const CardFeatured: React.FC<ProjectCardProps> = ({ project, className }) => (
		<div
			className={cn(
				'col-span-12 lg:col-span-9 relative rounded-2xl w-full flex flex-col justify-between lg:min-h-[360px] border bg-background-tertiary',
				className
			)}
		>
			<div className="grid grid-cols-6 gap-2 h-full">
				<div className="relative col-span-2 lg:col-span-3 py-4 flex items-center">
					<CursorGlow
						containerClass="rounded-r-xl"
						cursorClass="rounded-full bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
						cursorElement={<IconArrowUpRight className="w-6 h-6" />}
					>
						<a
							href={project.deployLink || project.githubLink}
							target="_blank"
							aria-label={project.deployLink ? 'Visit deployed site' : 'View source code'}
							className="relative rounded-r-xl h-full cursor-none"
						>
							<Image
								priority
								src={project.image as string}
								alt=""
								width={600}
								height={450}
								draggable={false}
								className="select-none h-full w-full object-cover rounded-r-xl shadow-xl object-right-bottom lg:object-right"
							/>
							<div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-black/10 rounded-r-xl"></div>
						</a>
					</CursorGlow>
				</div>
				<div className="col-span-4 lg:col-span-3 py-5 px-3 sm:px-5 flex flex-col h-full gap-y-2 pt-20 lg:pt-16 justify-center">
					<h3 className="text-lg text-balance">{project.title}</h3>
					<p className="text-sm leading-7 text-pretty text-foreground-secondary">
						{project.description}
					</p>
				</div>
			</div>
			<CardFooter project={project} />
			<div className="flex space-x-2 absolute top-5 right-3 sm:right-6">
				{renderButtons(project)}
			</div>
		</div>
	);

	const CardStandard: React.FC<ProjectCardProps> = ({ project, className }) => (
		<motion.div
			initial={{ opacity: 0, y: 75 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				ease: 'easeInOut',
			}}
			className={cn(
				'col-span-12 md:col-span-7 lg:col-span-8 relative rounded-2xl w-full flex flex-col justify-between lg:min-h-[360px] border bg-background-tertiary shadow-shadow',
				className
			)}
		>
			<div className="grid grid-cols-6 gap-2 h-full">
				<div
					className={cn(
						'relative col-span-2 lg:col-span-2 py-4 flex items-center',
						variant == 'reversed' && 'order-2'
					)}
				>
					<CursorGlow
						containerClass={cn(variant == 'reversed' ? 'rounded-l-xl' : 'rounded-r-xl')}
						cursorClass="bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
						cursorElement={<IconArrowUpRight className="w-6 h-6" />}
					>
						<a
							href={project.deployLink ?? project.githubLink}
							target="_blank"
							aria-label={project.deployLink ? 'Visit deployed site' : 'View source code'}
							className={cn(
								'relative h-full cursor-none',
								variant == 'reversed' ? 'rounded-l-xl' : 'rounded-r-xl'
							)}
						>
							<Image
								src={project.image as string}
								alt=""
								width={600}
								height={450}
								draggable={false}
								className={cn(
									'select-none h-full w-full object-cover shadow-xl',
									variant == 'reversed'
										? 'object-left-bottom lg:object-left rounded-l-xl'
										: 'object-right-bottom lg:object-right rounded-r-xl'
								)}
							/>
							<div
								className={cn(
									'absolute inset-0 from-black/70 to-black/10',
									variant == 'reversed'
										? 'bg-gradient-to-tl rounded-l-xl'
										: 'bg-gradient-to-tr rounded-r-xl'
								)}
							></div>
						</a>
					</CursorGlow>
				</div>
				<div
					className={cn(
						'col-span-4 py-5 px-3 sm:px-6 flex flex-col h-full gap-y-2 pt-20 lg:pt-16 justify-center',
						variant == 'reversed' && 'order-1'
					)}
				>
					<h3 className="text-lg text-balance">{project.title}</h3>
					<p className="text-sm leading-7 text-pretty text-foreground-secondary">
						{project.description}
					</p>
				</div>
			</div>
			<CardFooter project={project} />
			<div
				className={cn(
					'flex space-x-2 absolute top-5',
					variant == 'reversed' ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
				)}
			>
				{renderButtons(project)}
			</div>
		</motion.div>
	);

	const CardSmall: React.FC<ProjectCardProps> = ({ project, className }) => (
		<motion.div
			initial={{ opacity: 0, y: 75 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				ease: 'easeInOut',
			}}
			className={cn(
				'col-span-12 md:col-span-5 lg:col-span-4 relative rounded-2xl w-full flex flex-col justify-between min-h-[300px] border bg-background-tertiary shadow-shadow',
				className
			)}
		>
			<div className="py-5 px-3 sm:px-6 flex flex-col h-full gap-y-2 pt-16 lg:pt-16 justify-center">
				<h3 className="text-lg text-balance">{project.title}</h3>
				<p className="text-sm leading-7 text-pretty text-foreground-secondary">
					{project.description}
				</p>
			</div>
			<CardFooter project={project} />
			<div className="flex space-x-3 absolute top-4 right-3 sm:right-6">
				{renderButtons(project)}
			</div>
		</motion.div>
	);

	const renderCard = () => {
		switch (variant) {
			case 'featured':
				return <CardFeatured project={project} className={className} />;
			case 'small':
				return <CardSmall project={project} className={className} />;
			case 'reversed':
				return <CardStandard project={project} className={className} />;
			default:
				return <CardStandard project={project} className={className} />;
		}
	};

	return renderCard();
}
