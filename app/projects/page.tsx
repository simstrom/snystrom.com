import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import CardOverlay from '@/components/ui/CardOverlay';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { projectsData } from '@/data/data';
import { IconGithub } from '@/data/icons';
import { cn } from '@/lib/utils';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';

export const metadata: Metadata = {
	title: 'Projects',
	description: "Some of the things I've built, tinkered with, or just enjoyed working on.",
};

export default function Projects() {
	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Projects`,
		description: metadata.description || '',
		url: `${SITE_URL}/projects`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: projectsData.map((project) => ({
				'@type': 'SoftwareSourceCode',
				name: project.title,
				description: project.description,
				codeRepository: project.githubLink,
				image: `${SITE_URL}/${project.image}`,
			})),
		},
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="projects_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Projects"
				content="Some of the things I've built, tinkered with, or just enjoyed working on."
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
								<div className="relative rounded-2xl overflow-hidden ring-1 ring-border h-[300px]">
									<Image
										src={project.image}
										alt=""
										width={512}
										height={300}
										className="w-full h-full object-cover rounded-2xl"
									/>

									<CardOverlay className="from-brand/50 via-brand/20 to-transparent" />
								</div>
							)}
							<div className="p-6 flex justify-between items-center border-t bg-background-secondary">
								<h3 className="text-xl">{project.title}</h3>
								<div className="flex gap-x-4">
									{/* <IconArrowRight width={30} height={30} className="group" /> */}
									<IconGithub
										width={18}
										height={18}
										className="transition-transform group-hover:scale-110"
									/>
								</div>
							</div>
							<div className="px-6 py-3 border-t flex items-center gap-x-4 text-sm text-foreground-tertiary">
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
