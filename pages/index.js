import Image from 'next/image';
import readingTime from 'reading-time';
import { client } from '../lib/contentful-server';

import Button from '@/components/Button';
import SmallProject from '@/components/SmallProject';
import Carousel from '../components/Carousel';
import Contact from '../components/Contact';
import Container from '../components/Container';
import FeaturedPost from '../components/FeaturedPost';
import { BulletIcon } from '../components/Icons';
import LinkArrow from '../components/LinkArrow';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import InView from '../lib/InView';
import hero from '../public/images/hero.jpg';

const skills = {
	technologies: ['React', 'Java', 'JavaScript', 'SQL', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
	tools: ['Git', 'Figma', 'Trello', 'Notion'],
};
const gradients = [
	{ from: 'from-emerald-400', to: 'to-blue-400' },
	{ from: 'from-pink-400', to: 'to-indigo-400' },
	{ from: 'from-orange-300', to: 'to-rose-400' },
];

export default function Home({ featuredProjects, articles }) {
	return (
		<Container>
			<section className="flex flex-col sm:grid grid-cols-5 gap-10 items-center sm:h-96">
				<div className="text-center sm:text-left order-2 sm:order-1 flex flex-col gap-1 sm:col-span-3">
					<span className="text-2xl max-[440px]:text-xl text-brand animate-in">
						👋🏼 Hi there, my name is
					</span>
					<h1 className="text-4xl leading-normal animate-in animation-delay-1">Simon Nyström.</h1>
					<h2 className=" text-base mt-4 sm:text-xl sm:font-medium sm:mt-0 text-secondary animate-in animation-delay-2">
						I&apos;m a Software Developer Student with a passion for combining code and design to
						build engaging user interfaces.
					</h2>
				</div>
				<div className="order-1 sm:order-2 sm:col-span-2 w-60 sm:w-full animate-in">
					<Image
						src={hero}
						alt=""
						width={400}
						height={400}
						priority
						draggable="false"
						className="rounded-full sm:rounded-xl drop-shadow-lg image-fluid"
					/>
				</div>
			</section>

			<section className="animate-in animation-delay-3">
				<SectionHeader btnText="Get to Know me More" href="/about">
					About Me
				</SectionHeader>

				<div className="flex flex-col gap-8 sm:grid md:gap-10 grid-cols-3">
					<div className="col-span-2">
						<p className="text-secondary text-base">
							Welcome to my digital playground! I&apos;m currently pursuing a degree in Software
							Development, but that hasn&apos;t stopped me from devoting my free time to improving
							my expertise in web development. I have always found myself drawn to more artistic
							endeavours such as design and photography. However, when I first entered the world of
							programming I discovered an outlet to combine my problem solving skills with the
							unleashing of creativity. Needless to say, something just clicked. This portfolio is a
							reflection of my ongoing journey where I highlight projects I&apos;ve built and share
							insights on lessons learned. So, grab a cup of coffee and let&apos;s go!
						</p>
					</div>
					<LinkArrow text="Get to Know me More" href="/about" sm />
					<div>
						<h3 className="text-lg mb-4">Technologies</h3>

						<ul className="gap-4 grid grid-cols-2 sm:text-sm mb-4 text-base text-secondary">
							{skills.technologies.map((skill, index) => (
								<li key={index} className="flex gap-2 items-center">
									<BulletIcon />
									{skill}
								</li>
							))}
						</ul>
						<h4 className="font-semibold text-lg tracking-tight mb-2">Tools</h4>
						<ul className="gap-4 grid grid-cols-2 sm:text-sm text-base text-secondary">
							{skills.tools.map((skill, index) => (
								<li key={index} className="flex gap-2 items-center">
									<BulletIcon />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section>
				<InView>
					<SectionHeader btnText="Explore All Projects" href="/projects">
						Selected Projects
					</SectionHeader>
				</InView>

				<div className="flex flex-col gap-8 sm:grid grid-cols-2 mb-8">
					{featuredProjects.slice(0, 2).map((proj) => (
						<ProjectCard key={proj.fields.title} project={proj.fields.project.fields} />
					))}
				</div>

				<SmallProject project={featuredProjects[2].fields.project.fields} />
				<Button href="/projects">See more Projects</Button>
			</section>

			<section>
				<InView>
					<SectionHeader btnText="View All Articles" href="/blog">
						Latest Blog Posts
					</SectionHeader>
					<div className="flex flex-col gap-6 sm:grid grid-cols-3 mb-8">
						{articles.map((article, index) => (
							<FeaturedPost
								key={article.sys.id}
								article={article}
								gradientFrom={gradients[index].from}
								gradientTo={gradients[index].to}
							/>
						))}
						<LinkArrow text="View All Articles" href="/blog" sm />
					</div>
				</InView>
			</section>

			<section>
				<InView>
					<SectionHeader btnText="View Gallery" href="/gallery">
						Photography
					</SectionHeader>
					<div className="flex flex-col gap-8 ">
						<p className="text-secondary text-base mb-2">
							When I&apos;m not behind the computer writing code, you&apos;ll find me on the hunt
							for my next adventure. Over the years, I&apos;ve captured countless memories from my
							travels all around the world. Take a look and see for yourself!
						</p>

						<Carousel />
						<LinkArrow text="View Gallery" href="/gallery" sm />
					</div>
				</InView>
			</section>

			<section>
				<InView>
					<SectionHeader>Contact</SectionHeader>
					<Contact />
				</InView>
			</section>
		</Container>
	);
}

export async function getStaticProps() {
	const featuredProjects = await client.getEntries({
		content_type: 'featuredProject',
	});
	const articles = await client.getEntries({
		content_type: 'article',
		limit: 3,
		order: 'sys.createdAt',
	});
	for (let article of articles.items) {
		article.fields.readingTime = readingTime(article.fields.body).text;
	}

	return {
		props: {
			featuredProjects: featuredProjects.items,
			articles: articles.items.reverse(),
		},
	};
}
