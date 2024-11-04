import GalleryBlock from '@/components/sections/galleryBlock';
import PostViewHero from '@/components/sections/postViewHero';
import AnimatedBadge from '@/components/ui/animatedBadge';
import { AuroraBackground } from '@/components/ui/aurora';
import Button from '@/components/ui/button';
import ProjectCard from '@/components/ui/projectCard';
import { getAllTags, getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { projectsData } from '@/lib/data';
import { getImagesByTag } from '@/lib/gallery';
import { IconArrowRight, IconSparkle } from '@/lib/icons';
import { getAllViews } from '@/lib/queries';
import { Project } from '@/lib/types';
import Link from 'next/link';
// import { motion } from 'framer-motion';

export default async function Home() {
	const images = await getImagesByTag('Landing');
	const blogPosts = getBlogPosts();
	const allUniqueTags = getAllTags();
	const allViews = await getAllViews();
	const latestPost = getLatestBlogPost();
	const snystrom = projectsData.find((project) => project.title === 'Snystrom.com') as Project;

	return (
		<main className="grow flex flex-col items-center justify-center gap-20">
			<div className="w-screen h-screen flex flex-col items-center justify-center p-4 pt-24 sm:px-6 xl:px-16">
				<div className="absolute -z-20 w-5 h-5 bg-transparent rounded" />
				<AuroraBackground className="h-full w-full rounded-3xl text-foreground-inverse dark:text-foreground">
					{/* <div className="w-full h-full max-w-screen-lg mx-auto relative flex flex-col gap-4 justify-center">
						<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight">
							Background lights are cool you know.
						</h1>
						<div className="md:text-4xl py-4">And this, is chemical burn.</div>
					</div> */}
				</AuroraBackground>
			</div>
			{/* <AuroraBackground showRadialGradient={true}>
				<div className="max-w-screen-lg relative flex flex-col gap-4 justify-center px-6 lg:px-0">
					<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight">
						Background lights are cool you know.
					</h1>
					<div className="md:text-4xl py-4">And this, is chemical burn.</div>
					<button className="bg-background border backdrop-blur-md shadow-sm rounded-xl w-fit px-10 py-3 uppercase text-sm tracking-wide font-medium">
						Debug now
					</button>
				</div>
			</AuroraBackground> */}
			<section className="w-full">
				{latestPost && (
					<AnimatedBadge as={Link} href={`/blog/${latestPost.slug}`}>
						<IconSparkle width={18} height={18} className="text-brand" />
						<span className="hidden xs:block text-brand font-medium dark:font-[450]">Recent</span>
						<span className="text-foreground/30">|</span>
						<span className="truncate">{latestPost.data.title}</span>
						<IconArrowRight />
					</AnimatedBadge>
				)}

				<div className="flex items-end justify-between mb-4">
					<div>
						<div className="font-mono uppercase text-xs text-foreground-secondary tracking-wide">
							<span className="text-brand">• </span>
							Bio
						</div>
						<h2 className="text-2xl">About Me</h2>
					</div>
					<Button variant="link" href="/blog" className="pr-4 hidden sm:flex">
						Get to know me more
					</Button>
				</div>
				<PostViewHero
					posts={blogPosts}
					views={allViews}
					uniqueTags={allUniqueTags}
					showTags={false}
				/>
				<Button variant="link" href="/blog" className="pr-4 sm:hidden w-full mt-6">
					Get to know me more
				</Button>
			</section>

			<section className="w-full flex flex-col">
				<div className="mb-4">
					<div className="font-mono uppercase text-xs text-foreground-secondary tracking-wide">
						<span className="text-brand">• </span>
						Development
					</div>
					<h2 className="text-2xl">Selected Works</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-fit">
					<ProjectCard project={projectsData[0]} variant="featured" />
					<ProjectCard
						project={snystrom}
						variant="reversed"
						className="md:col-span-12 lg:col-span-12"
					/>
					{/* SIDE CONTENT */}
					{/* <div className="hidden lg:flex col-span-3 flex-col justify-center rounded-2xl w-full lg:min-h-[360px] border bg-background-tertiary group/card">
						<div className="flex-1 flex flex-col justify-center px-5 py-10">
							<h3>
								<span className="text-brand text-lg mr-2">‣</span>
								{snystrom.title}
							</h3>
							<p className="text-sm leading-7 text-pretty text-foreground-secondary pt-3">
								{snystrom.description}
							</p>
						</div>
						<div className="border-t dark:border-border/20 py-4 bg-background-secondary rounded-b-3xl flex">
							<Button variant="link" href="/colophon" className="ml-auto pr-5 h-fit">
								Learn more about the process
							</Button>
						</div>
					</div> */}
				</div>
				<Button size="small" href="/projects" className="text-xs mt-6 w-fit place-self-center">
					Browse all projects
				</Button>
			</section>

			<GalleryBlock images={images} />

			<section className="w-full flex flex-col mb-10">
				<div className="mb-4">
					<div className="font-mono uppercase text-xs text-foreground-secondary tracking-wide">
						<span className="text-brand">• </span>
						Blog
					</div>
					<h2 className="text-2xl">Latest Articles and Tutorials</h2>
				</div>
				<PostViewHero
					posts={blogPosts}
					views={allViews}
					uniqueTags={allUniqueTags}
					showTags={false}
				/>
				<Button variant="link" href="/blog" className="mt-2 p-4 place-self-center">
					Browse all articles
				</Button>
			</section>
		</main>
	);
}
