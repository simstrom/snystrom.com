import { IconArrowUpRight, IconGithub } from '@/lib/icons';
import { Project } from '@/lib/types';
import { Fragment } from 'react';
import Button from './button';

export default function ProjectListItem({ project }: { project: Project }) {
	return (
		<div className="flex justify-between items-center pb-6 border-b">
			<div className="flex flex-col gap-y-2">
				<h3 className="text-xl sm:text-2xl lg:text-3xl tracking-tight">{project.title}</h3>
				<ul className="mt-2 hidden sm:flex flex-wrap gap-2 items-center text-xs uppercase font-medium tracking-wide text-foreground-secondary">
					{project.skills.map((skill: any, idx: number) => (
						<Fragment key={idx}>
							<li>
								{skill}
								{idx != project.skills.length - 1 && <span className="text-brand pl-2">•</span>}
							</li>
						</Fragment>
					))}
				</ul>
			</div>
			<div className="flex space-x-2">
				{project.deployLink && (
					<Button size="icon" isExternalLink href={project.deployLink}>
						<IconArrowUpRight />
					</Button>
				)}
				{project.githubLink && (
					<Button size="icon" isExternalLink href={project.githubLink}>
						<IconGithub />
					</Button>
				)}
			</div>
		</div>
	);
}
