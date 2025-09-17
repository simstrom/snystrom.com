import PageHeader from '@/components/layouts/PageHeader';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { projectsData } from '@/data/data';
import { IconCode, IconGithub } from '@/data/icons';

import { Metadata } from 'next';
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
				subtitle={{ text: 'Dev', Icon: IconCode }}
			/>

			<section className="grid grid-cols-2 gap-4 p-4 border-t pb-20">
				{projectsData.map((project, idx) => (
					<Card
						key={project.title}
						href={project.githubLink ?? ''}
						image={project.image}
						imageMeta={{ blur: '', width: 512, height: 300 }}
						className="h-[260px]"
					>
						<CardBody title={project.title} icon={IconGithub} className="mt-2 line-clamp-none">
							{project.description}
						</CardBody>
						<CardFooter>
							{project.stack.map((item) => (
								<span key={item}>{item}</span>
							))}
						</CardFooter>
					</Card>
					// <Link
					// 	key={project.title}
					// 	href={project.githubLink ?? ''}
					// 	target="_blank"
					// 	rel="noreferrer"
					// 	className={cn(
					// 		'flex flex-col flex-1 group ring-1 ring-border rounded-2xl transition-colors bg-background-secondary/60 hover:bg-background-secondary/20 dark:hover:bg-background-secondary'
					// 	)}
					// >
					// 	<div className="relative h-[260px] m-1.5 rounded-xl border shadow-inner overflow-hidden bg-background">
					// 		{project.image && (
					// 			<Image
					// 				src={project.image}
					// 				alt={project.title}
					// 				width={512}
					// 				height={300}
					// 				className="object-cover w-full h-full"
					// 			/>
					// 		)}
					// 		<div className="absolute inset-0 w-full h-full z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
					// 		<CardOverlay withIcon />
					// 	</div>

					// 	<div className="px-6 py-2 flex gap-x-2 justify-between items-center">
					// 		<h3 className="text-balance text-lg">{project.title}</h3>
					// 		<IconGithub className="w-5 h-5 text-foreground-tertiary" />
					// 	</div>

					// 	<p className="px-6 mb-4 text-foreground-secondary">{project.description}</p>

					// 	<div className="shadow-inner mt-auto border-t px-6 py-3 flex gap-x-2 items-center text-sm text-foreground-tertiary">
					// 		{project.stack.map((item) => (
					// 			<span key={item}>{item}</span>
					// 		))}
					// 	</div>
					// </Link>
				))}
			</section>
		</main>
	);
}
