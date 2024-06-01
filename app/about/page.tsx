import HorizontalScroller from '@/components/ui/horizontalScroller';
import PageHeader from '@/components/ui/pageHeader';
import Timeline from '@/components/ui/timeline';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About',
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

export default function About() {
	return (
		<main className="max-w-3xl mx-auto pt-32 sm:pt-40">
			<div className="absolute -translate-y-5 font-mono uppercase text-xs tracking-wide text-foreground-secondary">
				<span className="text-brand">• </span>Bio
			</div>
			<PageHeader
				title="About"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<div className="pt-8 sm:pt-12 space-y-12">
				<div className="space-y-4">
					<p className=" text-lg leading-7">
						As a full-time creative, I prioritize inclusion to create experiences that resonate with
						diverse audiences. By incorporating different perspectives, experiences, and needs into
						my creative process, I am able to create effective solutions to complex challenges.
					</p>
					<p className="text-foreground-secondary leading-7">
						As a Senior Art Director at Doe-Anderson, I am passionate about utilizing human-centered
						design principles to tell compelling brand stories. I strongly believe that effective
						design incorporates user experience and I am dedicated to exploring innovative ways for
						brands to connect with their audience. Constantly seeking inspiration and techniques to
						elevate my process, I am committed to delivering exceptional creative solutions that
						build brand experiences.
					</p>
				</div>
				<div className="space-y-2">
					<HorizontalScroller
						items={skills.slice(0, skills.length / 2)}
						speed="slow"
						separator="•"
						className="text-xl font-normal select-none"
					/>
					<HorizontalScroller
						items={skills.slice(skills.length / 2)}
						speed="slow"
						separator="•"
						className="text-xl font-normal select-none"
					/>
				</div>
				<Timeline className="pt-8 sm:pt-12" />
			</div>
		</main>
	);
}
