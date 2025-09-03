import AnimatedBadge from '@/components/ui/animatedBadge';
import HorizontalScroller from '@/components/ui/horizontalScroller';
import { Section } from '@/components/ui/section';
import { getAllTags, getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';
import { projectsData } from '@/lib/data';
import { getCoverImages } from '@/lib/gallery';
import { IconArrowRight } from '@/lib/icons';
import { Project } from '@/lib/types';
import { cn, formatDate, slugify } from '@/lib/utils';
import HeroImage from '@/public/images/hero.jpg';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
// import { motion } from 'framer-motion';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	// const images = await getImagesByTag('Landing');
	const galleryCollections = (await getCoverImages('destinations'))
		.filter((collection) => collection.cover != null)
		.slice(0, 3);
	const blogPosts = getBlogPosts();
	const allUniqueTags = getAllTags();
	const latestPost = getLatestBlogPost();
	const snystrom = projectsData.find((project) => project.title === 'Snystrom.com') as Project;

	return (
		<main className="grow flex flex-col items-center justify-center">
			{/* <div className="h-screen flex flex-col items-center justify-center p-4 pt-24 sm:px-6 xl:px-16"></div> */}
			{/* <AuroraBackground showRadialGradient={true}>
				<div className="max-w-5xl relative flex flex-col gap-4 justify-center px-6 lg:px-0">
					<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight">
						Background lights are cool you know.
					</h1>
					<div className="md:text-4xl py-4">And this, is chemical burn.</div>
					<button className="bg-background border backdrop-blur-md shadow-sm rounded-xl w-fit px-10 py-3 uppercase text-sm tracking-wide font-medium">
						Debug now
					</button>
				</div>
			</AuroraBackground> */}
			<section className="w-full border-b pt-32">
				<div className="max-w-5xl mx-auto flex flex-col border-x"></div>
			</section>

			<Section className="pb-0">
				{latestPost && (
					<AnimatedBadge
						as={Link}
						href={`/blog/${latestPost.slug}`}
						className="group-hover:bg-foreground group-hover:text-background transition-colors"
					>
						<div>
							<div className="text-sm text-foreground-secondary transition-colors group-hover:text-background/70">
								Latest Post
							</div>
							<span className="line-clamp-1">{latestPost.title}</span>
						</div>
						<IconArrowRight width={30} height={30} className="min-w-[20px] min-h-[20px] ml-auto" />
					</AnimatedBadge>
				)}
			</Section>

			<Section title="About" subtitle="Bio" linkHref="/about" showHeader>
				<div className="grid grid-cols-1 md:grid-cols-4 items-center border-b">
					<div className="px-6 py-4 col-span-3 h-full border-r flex items-center">
						<p className="leading-7">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. In vel eaque asperiores
							maiores perferendis eveniet. Cupiditate temporibus id quam, nesciunt dolores sapiente
							dignissimos, omnis facere, aperiam ducimus voluptates. Ab, beatae? Lorem ipsum dolor
							sit amet consectetur adipisicing elit. Architecto, facere libero cum magnam assumenda
							reprehenderit nihil odit et eligendi amet ullam temporibus ex, consequatur dolor
							pariatur totam rem ea deleniti!
						</p>
					</div>
					<div className="px-6 py-4">
						<Image
							src={HeroImage}
							alt=""
							priority
							placeholder="blur"
							draggable={false}
							className="aspect-square object-cover object-center border border-black rounded-full grayscale"
						/>
					</div>
				</div>
			</Section>

			<Section title="Selected Works" subtitle="Dev" linkHref="/projects" showHeader>
				<div className="grid grid-cols-1 md:grid-cols-2 border-b">
					{projectsData.slice(0, 2).map((project, idx) => (
						<Link
							key={project.title}
							href={project.title}
							className={cn('flex flex-col group', idx !== 0 && 'border-l')}
						>
							<div className="px-6 py-6 flex justify-between items-center transition-colors group-hover:bg-foreground group-hover:text-background">
								<h3 className="text-xl">{project.title}</h3>
								<IconArrowRight width={30} height={30} className="group" />
							</div>
							<div className="px-6 py-4 border-t">
								<p className="leading-7">{project.description}</p>
							</div>
							<div className="border-t py-4 mt-auto">
								<div className="relative overflow-hidden text-sm font-medium text-foreground-secondary select-none">
									<HorizontalScroller items={project.stack} separator="•" />
								</div>
							</div>
						</Link>
					))}
				</div>
			</Section>

			<Section title="Latest Posts" subtitle="Blog" linkHref="/blog" showHeader>
				<div className="flex md:flex-row flex-col border-b">
					{blogPosts.slice(0, 3).map((post, idx) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className={cn('flex flex-col flex-1 group', idx !== 0 && 'border-l')}
						>
							<div className="px-6 py-6 flex gap-x-2 justify-between items-end transition-colors group-hover:bg-foreground group-hover:text-background">
								<h3 className="text-xl text-pretty">{post.title}</h3>
								<IconArrowRight
									width={30}
									height={30}
									className="group min-w-[30px] min-h-[30px]"
								/>
							</div>
							<div className="px-6 py-4 border-t">
								<p className="text-foreground leading-7">{post.summary}</p>
							</div>
							<div className="mt-auto border-t px-6 py-4 flex gap-x-2 items-center text-sm font-medium">
								<time className="text-foreground-secondary">{formatDate(post.date, true)}</time>
								<span className="text-foreground-tertiary">·</span>
								<p className="text-foreground-secondary">{post.readingTime}</p>
							</div>
						</Link>
					))}
				</div>
			</Section>

			<Section
				title="Gallery"
				subtitle="Photography"
				linkHref="/gallery"
				showHeader
				borderOrigin={null}
				className="pb-0"
			>
				<div className="flex md:flex-row flex-col">
					{galleryCollections.map((collection, idx) => (
						<Link
							href={`/gallery/destinations/${slugify(collection.title)}`}
							key={collection.title}
							className={cn('flex flex-col flex-1 group', idx !== 0 && 'border-l')}
						>
							<div className="relative border-b">
								<Image
									src={collection.cover.src}
									alt={''}
									width={collection.cover.width}
									height={collection.cover.height}
									className="object-cover w-full h-full max-h-[440px]"
								/>
								<div className="absolute top-0 w-full h-full bg-black/30 transition-colors group-hover:bg-transparent"></div>
							</div>
							<div className="px-6 py-6 flex gap-x-2 justify-between items-end transition-colors group-hover:bg-foreground group-hover:text-background">
								<h3 className="text-xl text-pretty">{collection.title}</h3>
								<IconArrowRight
									width={30}
									height={30}
									className="group min-w-[30px] min-h-[30px]"
								/>
							</div>
						</Link>
					))}
				</div>
			</Section>

			{/* <GalleryBlock images={images} /> */}
		</main>
	);
}
