import Button from '@/components/ui/button';
import HorizontalImages from '@/components/ui/horizontalImages';
import HorizontalScroller from '@/components/ui/horizontalScroller';
import PageHeader from '@/components/ui/pageHeader';
import Timeline from '@/components/ui/timeline';
import { timelineData } from '@/lib/data';
import { getImagesInCollection } from '@/lib/gallery';
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
	const result = await getImagesInCollection('about');
	const scrollerImages = [...result, ...result, ...result];

	return (
		<main className="max-w-screen-lg mx-auto pt-32 sm:pt-40">
			<div className="absolute -translate-y-5 font-mono uppercase text-xs tracking-wide text-foreground-secondary">
				<span className="text-brand">• </span>Bio
			</div>
			<PageHeader title="About Me" content="" className="mb-4 md:mb-8" />
			<div className="grid md:grid-cols-12 gap-y-4 md:gap-8 mb-10 animate-slide">
				<Image
					src={HeroImage}
					alt=""
					priority
					placeholder="blur"
					className="col-span-12 md:col-span-5 aspect-square sm:aspect-video md:aspect-[4/5] w-full h-full object-cover object-center border border-black rounded-3xl mb-4"
				/>

				<div className="col-span-12 md:col-span-7 space-y-12">
					<div className="flex flex-col items-center gap-y-6">
						<p className=" text-lg leading-7">
							As a full-time creative, I prioritize inclusion to create experiences that resonate
							with diverse audiences. By incorporating different perspectives, experiences, and
							needs into my creative process, I am able to create effective solutions to complex
							challenges.
						</p>

						<p className="text-foreground-secondary leading-7">
							As a Senior Art Director at Doe-Anderson, I am passionate about utilizing
							human-centered design principles to tell compelling brand stories. I strongly believe
							that effective design incorporates user experience and I am dedicated to exploring
							innovative ways for brands to connect with their audience. Constantly seeking
							inspiration and techniques to elevate my process, I am committed to delivering
							exceptional creative solutions that build brand experiences.
						</p>
						<p className="text-foreground-secondary leading-7">
							As a Senior Art Director at Doe-Anderson, I am passionate about utilizing
							human-centered design principles to tell compelling brand stories. I strongly believe
							that effective design incorporates user experience and I am dedicated to exploring
							innovative ways for brands to connect with their audience. Constantly seeking
							inspiration and techniques to elevate my process, I am committed to delivering
							exceptional creative solutions that build brand experiences.
						</p>
					</div>
				</div>
			</div>
			<div className="space-y-2 mb-20 animate-slide">
				<HorizontalScroller
					items={skills.slice(0, skills.length / 2)}
					speed="slow"
					separator="•"
					className="text-lg sm:text-2xl font-normal select-none"
				/>
				<HorizontalScroller
					items={skills.slice(skills.length / 2)}
					speed="slow"
					separator="•"
					className="sm:text-lg font-normal select-none"
				/>
			</div>

			<HorizontalImages items={scrollerImages} className="mb-20 pt-10" />

			<Timeline items={timelineData} title="Milestones" body="A timeline of key events">
				<Button href="/cv.pdf" isExternalLink size="small" className="mt-8 text-xs tracking-wide">
					Contact
				</Button>
			</Timeline>
		</main>
	);
}
