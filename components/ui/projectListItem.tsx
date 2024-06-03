import { useScreenBreakpoints } from '@/lib/hooks';
import { IconArrowUpRight, IconGithub } from '@/lib/icons';
import { Project } from '@/lib/types';
import Image from 'next/image';
import { Fragment } from 'react';
import Button from './button';
import CursorGlow from './cursorGlow';

export default function ProjectListItem({ project }: { project: Project }) {
	const { isSmall } = useScreenBreakpoints();

	return (
		<div
			onClick={() => !isSmall && window.open(project.deployLink ?? project.githubLink, '_blank')}
			className="flex justify-between items-center gap-x-20 border-b cursor-default"
		>
			<CursorGlow
				containerClass="overflow-visible cursor-none py-6"
				cursorClass="font-mono uppercase text-xs tracking-wide"
				size={480}
				cursorElement={
					<div className="w-80 relative items-center justify-center flex">
						<Image
							src={project.image as string}
							alt=""
							width={600}
							height={450}
							draggable={false}
							className="select-none h-full w-full object-cover rounded-lg aspect-video border"
						/>
						<div className="text-center p-5 rounded-full bg-brand backdrop-blur-sm text-foreground-inverse dark:text-foreground absolute flex items-center justify-center w-20 h-20">
							{project.deployLink ? 'View Live' : 'View Code'}
						</div>
					</div>
				}
			>
				<div className="flex flex-col">
					<h3>{project.title}</h3>
					<ul className="mt-2 hidden sm:flex flex-wrap gap-2 items-center font-mono text-xs tracking-tight text-foreground-secondary">
						{project.stack.map((skill: any, idx: number) => (
							<Fragment key={idx}>
								<li>
									{skill}
									{idx != project.stack.length - 1 && <span className="text-brand pl-2">•</span>}
								</li>
							</Fragment>
						))}
					</ul>
				</div>
			</CursorGlow>
			<div className="flex space-x-2">
				{project.deployLink && (
					<Button
						aria-label="Visit deployed site"
						size="icon"
						isExternalLink
						href={project.deployLink}
					>
						<IconArrowUpRight />
					</Button>
				)}
				{project.githubLink && (
					<Button
						aria-label="View source code"
						size="icon"
						isExternalLink
						href={project.githubLink}
					>
						<IconGithub />
					</Button>
				)}
			</div>
		</div>
	);
}
