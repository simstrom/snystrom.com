import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import { projectsData } from '@/data/data';
import { IconGithub } from '@/data/icons';

import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'A collection of my web projects and engineering work.',
};

export default function Projects() {
	return (
		<main className="grow">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<Section borderOrigin={'t'}>
				<div className="grid grid-cols-1 md:grid-cols-2 border-b">
					{projectsData.map((project, idx) => (
						<Link
							key={project.title}
							href={project.githubLink ?? ''}
							target="_blank"
							rel="noreferrer"
							className={cn(
								'bg-background relative flex flex-col group',
								idx % 2 === 0 && 'border-r',
								idx !== projectsData.length - 1 && 'border-b'
							)}
						>
							{project.image && (
								<div className="relative rounded-3xl overflow-hidden ring-1 ring-border h-[280px]">
									<Image
										src={project.image}
										alt=""
										width={800}
										height={400}
										className="aspect-video w-full object-cover"
									/>

									<div className="user-select-none pointer-events-none absolute inset-0 z-10 bg-linear-to-tl from-brand/50 via-brand/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
							)}
							<div className="p-6 flex justify-between items-center border-t bg-background-secondary transition-colors group-hover:bg-foreground group-hover:text-background">
								<h3 className="text-xl">{project.title}</h3>
								<div className="flex gap-x-4">
									{/* <IconArrowRight width={30} height={30} className="group" /> */}
									<IconGithub
										width={24}
										height={24}
										className="transition-transform group-hover:scale-110"
									/>
								</div>
							</div>
							<div className="px-6 py-2 border-t flex items-center gap-x-4 text-sm text-foreground-tertiary">
								{project.stack.slice(0, 5).map((item) => (
									<span key={item}>{item}</span>
								))}
							</div>
							<div className="px-6 pt-4 pb-6 border-t">
								<p className="text-foreground-secondary">{project.description}</p>
							</div>
							{idx !== projectsData.length - 1 && (
								<div className="mt-auto h-8 border-t bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px]"></div>
							)}
						</Link>
					))}
				</div>
			</Section>
		</main>
	);
}
