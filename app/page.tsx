import { Section } from '@/components/layouts/Section';

import { SITE_URL } from '@/data/constants';
import { projectsData } from '@/data/data';
import { IconArrowRight, IconHourglass, IconNextjs, IconReact, IconTailwind } from '@/data/icons';
import { getAllTags, getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { getAllImages } from '@/lib/gallery';
import { Project } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
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
	const galleryImages = (await getAllImages(4)).images;
	const blogPosts = getBlogPosts();
	const allUniqueTags = getAllTags();
	const latestPost = getLatestBlogPost();
	const snystrom = projectsData.find((project) => project.title === 'Snystrom.com') as Project;

	return (
		<main className="grow flex flex-col items-center justify-center">
			<Section className="pt-32">
				<div className="grid grid-cols-12 auto-rows-fr h-120 outline-none divide-x divide-y border-y">
					<div className="col-span-5 row-span-6">
						<Link
							href="/about"
							className={cn(
								'relative flex h-full w-full p-4 rounded-2xl overflow-hidden group',
								'bg-background-secondary ring-1 ring-border ',
								'transition-colors hover:bg-background'
							)}
						>
							<div className="text-balance max-w-1/2 h-full flex flex-col justify-center">
								<h3 className="mb-2 transition-colors group-hover:text-brand">
									Learn more about me
								</h3>
								<p className="text-foreground-secondary text-base">
									Hey, I'm Simon.
									<br /> A front-end engineer and photographer.
								</p>
							</div>

							<div className="relative w-full">
								<Image
									src={HeroImage}
									alt=""
									priority
									placeholder="blur"
									draggable={false}
									className={cn(
										'absolute top-4 right-2 w-48 aspect-4/5 object-cover rounded-xl shadow-sm rotate-6',
										'transition-all duration-300 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-xl',
										'ring-1 ring-border ring-offset-4 ring-offset-background group-hover:ring-offset-8 group-hover:ring-brand/80'
									)}
								/>
							</div>
							<div
								className={cn(
									'absolute inset-0 z-10 bg-gradient-to-tl from-brand/20 via-transparent to-transparent',
									'opacity-0 transition-opacity duration-300 group-hover:opacity-100 user-select-none pointer-events-none '
								)}
							/>
						</Link>
					</div>
					<div className="col-span-7 row-span-8 border-r-0">
						<Link
							href="/gallery"
							className={cn(
								'relative flex items-center gap-2 w-full h-full p-4 rounded-2xl overflow-hidden group',
								'bg-background-secondary ring-1 ring-border ',
								'transition-colors hover:bg-background'
							)}
						>
							<div className="text-balance h-full w-full max-w-1/2 flex flex-col justify-center">
								<h3 className="transition-colors group-hover:text-brand">Photo gallery</h3>
								<p className="text-base text-foreground-secondary">
									Moments, places, and details I've noticed along the way.
								</p>
							</div>

							<div className="absolute z-10 -right-6 w-full flex justify-end">
								<div
									className={cn(
										'grid grid-cols-2 gap-2 w-fit',
										'transition-all duration-300',
										'ring-1 ring-border ring-offset-8 ring-offset-background-secondary group-hover:ring-offset-12 group-hover:ring-brand/80'
									)}
								>
									{galleryImages.map((img, i) => (
										<Image
											key={i}
											src={img.src}
											alt="gallery cover image"
											width={img.width}
											height={img.height}
											placeholder="blur"
											blurDataURL={img.blurData}
											priority={true}
											className={cn(
												'w-42 rounded-lg aspect-square object-cover shadow-md',
												'transition-all duration-300 group-hover:opacity-100 group-hover:hover:scale-105',
												i % 2 === 0 ? '-translate-y-5' : 'translate-y-5',
												i % 2 === 0 ? 'group-hover:translate-y-5' : 'group-hover:-translate-y-5'
											)}
										/>
									))}
								</div>
							</div>

							<div
								className={cn(
									'absolute inset-0 z-30 bg-gradient-to-tl from-brand/20 via-transparent to-transparent',
									'opacity-0 transition-opacity duration-300 group-hover:opacity-100 user-select-none pointer-events-none '
								)}
							/>
						</Link>
					</div>

					<div className="col-span-5 row-span-7 border-b-0">
						<Link
							href="/projects"
							className={cn(
								'relative flex flex-col items-center h-full w-full px-4 pt-6 pb-4 rounded-2xl overflow-hidden group',
								'bg-background-secondary ring-1 ring-border ',
								'transition-colors hover:bg-background'
							)}
						>
							<div className="text-balance text-center">
								<h3 className="transition-colors group-hover:text-brand">Projects</h3>
								<p className="text-foreground-secondary text-base">
									Some of the things I've built, tinkered with, or just enjoyed working on.
								</p>
							</div>

							<div className="relative flex items-center gap-2 mt-auto text-foreground-tertiary dark:text-foreground-tertiary/80 transition-colors dark:group-hover:text-foreground-tertiary">
								{[
									{ Icon: IconNextjs, size: 'w-10 h-10' },
									{ Icon: IconReact, size: 'w-12 h-12' },
									{ Icon: IconTailwind, size: 'w-10 h-10' },
								].map(({ Icon, size }, idx) => (
									<div
										key={idx}
										className={cn(
											'relative p-1.5 bg-foreground-tertiary/10 dark:bg-background-secondary border rounded-2xl shadow-inner',
											idx !== 1 && 'scale-90',
											'transition-all duration-300 group-hover:-translate-y-2 group-hover:border-brand/20'
										)}
									>
										<div className="p-6 bg-background-secondary dark:bg-foreground-tertiary/5 border rounded-xl shadow-lg transition-shadow group-hover:shadow-brand/40 dark:group-hover:shadow-brand/10">
											<Icon className={size} />
										</div>
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 from-20% via-white/10 to-30% to-background opacity-20 pointer-events-none" />
									</div>
								))}
							</div>

							<div
								className={cn(
									'absolute inset-0 z-10 bg-gradient-to-tl from-brand/20 via-transparent to-transparent',
									'opacity-0 transition-opacity duration-300 group-hover:opacity-100 user-select-none pointer-events-none '
								)}
							/>
						</Link>
					</div>

					<div className="col-span-7 row-span-5">
						<Link
							href={`/blog/${latestPost?.slug}`}
							className={cn(
								'relative flex items-center h-full w-full p-4 rounded-2xl overflow-hidden group',
								'bg-background-secondary ring-1 ring-border ',
								'transition-colors hover:bg-background'
							)}
						>
							<div className="text-balance h-full flex-1 max-w-xs flex flex-col justify-center text-sm font-medium">
								<span className="mb-1 text-foreground-secondary transition-colors group-hover:text-brand">
									Latest post
								</span>
								<p className="text-base">{latestPost?.title}</p>
								<div className="mt-5 flex items-center gap-x-2 text-foreground-secondary">
									<IconHourglass width={15} height={15} />
									<span>{latestPost?.readingTime}</span>
								</div>
							</div>
							<div className="relative flex-1 h-full">
								<div
									className={cn(
										'absolute -right-20 -bottom-14 p-2 rounded-xl flex flex-wrap gap-2',
										'transition-all duration-300 group-hover:rotate-0 group-hover:-translate-y-12 group-hover:-translate-x-12',
										'ring-1 ring-border ring-offset-4 ring-offset-background-secondary group-hover:ring-brand/80'
									)}
								>
									{Array.from({ length: 3 }).map((_, i) => {
										const tag = latestPost?.tags[i % (latestPost?.tags.length || 1)];
										return (
											<div
												key={i}
												className={cn(
													'relative text-xl w-full font-medium whitespace-nowrap px-4 py-2 bg-foreground-secondary/5 text-foreground-tertiary/60 rounded-xl transition-colors group-hover:text-foreground-tertiary'
												)}
											>
												<span className="transition-colors duration-300 group-hover:text-brand/80">
													#
												</span>
												{tag}
												<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 from-10% via-white/10 to-30% to-background opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-10" />
											</div>
										);
									})}
								</div>
								{/* <Image
									src={latestPost?.image ?? HeroImage}
									width={latestPost?.imageMeta?.width ?? 400}
									height={latestPost?.imageMeta?.height ?? 400}
									alt=""
									priority
									placeholder="blur"
									blurDataURL={latestPost?.imageMeta?.blur}
									draggable={false}
									className="absolute top-4 -right-10 w-80 aspect-video object-cover rounded-xl shadow-sm transition-all duration-300 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-xl group-hover:grayscale-0"
								/> */}
							</div>
							<div
								className={cn(
									'absolute inset-0 z-10 bg-gradient-to-tl from-brand/20 via-transparent to-transparent',
									'opacity-0 transition-opacity duration-300 group-hover:opacity-100 user-select-none pointer-events-none '
								)}
							/>
						</Link>
					</div>
				</div>
			</Section>

			{/* <Section className="pb-0">
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
			</Section> */}

			{/* <Section title="About" subtitle="Bio" linkHref="/about" showHeader>
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
			</Section> */}

			{/* <Section title="Selected Works" subtitle="Dev" linkHref="/projects" showHeader>
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
			</Section> */}

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

			{/* <Section
				title="Gallery"
				subtitle="Photography"
				linkHref="/gallery"
				showHeader
				borderOrigin={null}
			>
				<div className="grid grid-cols-3 border-b">
					{galleryCollections.map((collection, idx) => (
						<GalleryItem
							key={idx}
							isCollection={true}
							item={collection.cover}
							collectionTitle={collection.title}
							collectionType={'destinations'}
							priority={false}
							lightboxIndex={0}
							handleImageClick={null as any}
						/>
					))}
				</div>
			</Section> */}

			{/* <GalleryBlock images={images} /> */}
		</main>
	);
}
