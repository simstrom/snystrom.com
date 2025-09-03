import CustomLink from '@/components/blog/link';
import HorizontalImages from '@/components/ui/horizontalImages';
import HorizontalScroller from '@/components/ui/horizontalScroller';
import PageHeader from '@/components/ui/pageHeader';
import { Section } from '@/components/ui/section';
import { getImagesByTag } from '@/lib/gallery';
import { IconDoodleArrow, IconDoodleCompass, IconDoodleMountains } from '@/lib/icons';
import HeroImage from '@/public/images/hero.jpg';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'About Me',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
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
	const result = await getImagesByTag('About');
	const scrollerImages = [...result, ...result, ...result];

	return (
		<main className="grow">
			{/* <PageHeader title="About Me" className="pt-32 pb-12 bg-background-secondary" /> */}

			<div className="relative max-w-screen-lg mx-auto">
				{/* <span className="absolute top-28 px-6 ml-1 -translate-y-1 text-sm font-medium text-brand">
					Bio
				</span> */}
				<PageHeader title="About Me" className="pt-32 pb-12 bg-background-secondary" />
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
						<div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-t from-brand/50 via-brand/20 to-transparent mix-blend-soft-light" />
						<IconDoodleArrow className="text-brand w-28 h-28 absolute z-10 -top-14 left-6 rotate-12" />
						<IconDoodleCompass className="text-brand w-20 h-20 absolute z-10 -right-8 -top-8 -rotate-3" />
						<IconDoodleMountains className="text-brand w-20 h-20 absolute z-10 bottom-40 -left-10 rotate-12" />
					</div>

					<div className="col-span-12 md:col-span-8 prose max-w-none prose-p:leading-7 first:prose-p:text-foreground px-6 py-8">
						<p className="text-lg">
							As a full-time creative, I prioritize inclusion to create experiences that resonate
							with diverse audiences. By incorporating different perspectives, experiences, and
							needs into my creative process, I am able to create effective solutions to complex
							challenges.
						</p>

						<p>
							As a Senior Art Director at Doe-Anderson, I am passionate about utilizing
							human-centered design principles to tell compelling brand stories. I strongly believe
							that effective design incorporates user experience and I am dedicated to exploring
							innovative ways for brands to connect with their audience. Constantly seeking
							inspiration and techniques to elevate my process, I am committed to delivering
							exceptional creative solutions that build brand experiences.
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
				<HorizontalImages items={scrollerImages} className="mb-20 pt-10" />
				<p className="absolute bottom-20 right-10 -rotate-3 text-sm font-medium text-foreground-secondary">
					<span className="text-brand">* </span>I also do{' '}
					<CustomLink href="/gallery">photography</CustomLink>
				</p>
			</Section>

			{/* <Timeline items={timelineData} title="Milestones" body="A timeline of key events">
				<Button href="/cv.pdf" isExternalLink size="small" className="mt-8 text-xs tracking-wide">
					Contact
				</Button>
			</Timeline> */}
		</main>
	);
}
