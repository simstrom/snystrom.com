import CustomLink from '@/components/blog/Link';
import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import HorizontalImages from '@/components/ui/HorizontalImages';
import HorizontalScroller from '@/components/ui/HorizontalScroller';

import {
	SITE_CONTACT,
	SITE_DESCRIPTION,
	SITE_GITHUB_URL,
	SITE_INSTAGRAM_URL,
	SITE_LINKEDIN_URL,
	SITE_NAME,
	SITE_URL,
} from '@/data/constants';
import { IconDoodleArrow, IconDoodleCompass, IconDoodleMountains } from '@/data/icons';
import { getAllImages } from '@/lib/gallery';
import HeroImage from '@/public/images/hero.jpg';

import { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { AboutPage, WithContext } from 'schema-dts';

export const metadata: Metadata = {
	title: 'About',
};

const skills = [
	'JavaScript',
	'React',
	'Next.js',
	'Node.js',
	'Express',
	'MongoDB',
	'SQL',
	'HTML',
	'CSS',
	'TypeScript',
	'GraphQL',
	'Docker',
	'AWS',
	'Git',
	'Tailwind CSS',
];

export default async function About() {
	const { images } = await getAllImages(10);

	const jsonLd: WithContext<AboutPage> = {
		'@type': 'AboutPage',
		'@context': 'https://schema.org',
		url: SITE_URL,
		mainEntity: {
			'@type': 'Person',
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			email: SITE_CONTACT,
			url: SITE_URL,
			image: `${SITE_URL}/images/avatar.jpg`,
			sameAs: [SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_INSTAGRAM_URL],
			jobTitle: 'Front-end Engineer & Photographer',
		},
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="about_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="relative max-w-5xl mx-auto">
				<PageHeader title="About Me" />
			</div>

			<Section borderOrigin={'y'} className="pb-0">
				<div className="grid md:grid-cols-12 gap-y-4 divide-x">
					<div className="relative col-span-12 md:col-span-4">
						<Image
							src={HeroImage}
							alt=""
							priority
							placeholder="blur"
							className="rounded-3xl ring-1 ring-border aspect-square sm:aspect-video md:aspect-auto w-full h-full object-cover object-center grayscale"
						/>
						<div className="absolute inset-0 z-10 rounded-3xl bg-linear-to-tr from-brand/20 to-brand/10 mix-blend-soft-light" />
						<IconDoodleArrow className="text-brand w-24 h-24 absolute z-10 -top-4 left-6 rotate-12" />
						<IconDoodleCompass className="text-brand w-16 h-16 absolute z-10 -right-4 -top-4 -rotate-3" />
						<IconDoodleMountains className="text-brand w-16 h-16 absolute z-10 bottom-48 -left-6 rotate-12" />
					</div>

					<div className="col-span-12 md:col-span-8 prose max-w-none prose-p:leading-7 first:prose-p:text-foreground px-6 py-8">
						<p className="text-lg">
							Hey, I&apos;m Simon Nyström, a front-end engineer and photographer from Sweden. I got
							into coding out of curiosity and a love for making things work online, and it&apos;s
							been a wild ride ever since.
						</p>

						<p>
							I spend most of my days working with React, Next.js, and Tailwind CSS, building sites
							and apps that (hopefully) make people&apos;s lives a little easier or more fun.
							I&apos;m always tinkering, learning new tricks, and trying out fresh
							ideas—there&apos;s always something new to explore.
						</p>

						<p>
							When I&apos;m not deep in code, you&apos;ll probably find me with a camera in hand.
							Photography lets me slow down and notice the little things—whether it&apos;s a cool
							landscape, city vibes, or just everyday moments. It&apos;s my way of capturing stories
							and memories.
						</p>
						<p>
							Outside of work and photography, I love getting outdoors, traveling, or just kicking
							back with a good book. If you ever want to chat about tech, photos, or favorite hiking
							spots, I&apos;m always up for it!
						</p>
					</div>
				</div>
			</Section>

			<Section className="py-4 bg-background-secondary">
				<div className="space-y-2">
					<HorizontalScroller
						items={skills.slice(0, skills.length / 2)}
						speed="slow"
						separator="•"
						className="text-lg sm:text-2xl font-[450] select-none"
						pauseOnHover={false}
					/>
					<HorizontalScroller
						items={skills.slice(skills.length / 2)}
						speed="slow"
						separator="•"
						className="sm:text-lg font-[450] select-none"
						pauseOnHover={false}
					/>
				</div>
			</Section>

			<Section borderOrigin={null} className="pt-10 pb-0 relative">
				<HorizontalImages items={images} className="mb-20 pt-10" />
				<p className="absolute bottom-20 right-10 -rotate-3 text-sm font-medium text-foreground-secondary">
					<span className="text-brand">* </span>I also do{' '}
					<CustomLink href="/gallery">photography</CustomLink>
				</p>
			</Section>
		</main>
	);
}
