import CustomLink from '@/components/blog/Link';
import { Section } from '@/components/layouts/Section';
import {
	BentoCardAbout,
	BentoCardBlog,
	BentoCardGallery,
	BentoCardProjects,
} from '@/components/sections/BentoCards';
import { BentoGrid } from '@/components/ui/Bento';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';

import { SITE_URL } from '@/data/constants';
import { navItems } from '@/data/data';
import {
	IconArrow,
	IconDocument,
	IconDoodleCoffee,
	IconDoodleGuitar,
	IconDoodlePhoto,
	IconDoodleTech,
} from '@/data/icons';
import { getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { getLimitedImages } from '@/lib/gallery';
import { formatDate } from '@/lib/utils';
import avatar from '@/public/images/pixel.png';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	const galleryImages = await getLimitedImages(4);
	const blogPosts = getBlogPosts();
	const latestPost = getLatestBlogPost();

	return (
		<main className="grow pt-40">
			<Section className="space-y-8 text-center" borderOrigin={null}>
				<div className="group relative mx-auto p-2 rounded-full bg-background ring-1 ring-offset-6 ring-offset-background ring-border shadow-inner hover:ring-offset-8 transition-all">
					<Image
						src={avatar}
						alt="Profile Picture"
						width={128}
						height={128}
						className="rounded-full ring-2 ring-border ring-offset-4 ring-offset-background shadow-lg transition-all group-hover:ring-brand/80 group-hover:scale-105"
					/>

					<span className="absolute top-2 left-0 w-full text-xs px-2 py-1 rounded-lg border bg-background-secondary/50 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-3">
						Things on my mind
					</span>
					<div className="absolute inset-0 flex items-center justify-center -z-10 motion-safe:will-change-transform motion-safe:animate-rotate text-foreground-tertiary/50">
						<span className="motion-safe:animate-rotate-reverse absolute top-0 right-0 text-4xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-5 group-hover:-translate-y-5">
							<IconDoodlePhoto className="w-9 h-9" />
						</span>
						<span className="motion-safe:animate-rotate-reverse absolute bottom-0 right-0 text-4xl opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-5 group-hover:translate-y-5">
							<IconDoodleTech className="w-9 h-9" />
						</span>
						<span className="motion-safe:animate-rotate-reverse absolute top-0 left-0 text-4xl opacity-0  transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-5 group-hover:-translate-y-5">
							<IconDoodleGuitar className="w-9 h-9" />
						</span>
						<span className="motion-safe:animate-rotate-reverse absolute bottom-0 left-0 text-4xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-5 group-hover:translate-y-5">
							<IconDoodleCoffee className="w-9 h-9" />
						</span>
					</div>
				</div>
				<div className="max-w-2xl mx-auto text-balance ">
					<h1 className="text-xl mb-2">Hey, I&apos;m Simon</h1>
					<p className="text-foreground-secondary">
						I'm a software engineer specializing in building exceptional digital experiences.
						Currently, I'm focused on building accessible, human-centered products at{' '}
					</p>
					<div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium">
						{navItems.socialLinks.map((item) => (
							<CustomLink
								key={item.path}
								href={item.path}
								className="before:content-none flex items-center gap-2 py-2 px-4 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
							>
								{item.icon && item.path.startsWith('/') && <item.icon className="w-5 h-5" />}
								<span>{item.name}</span>
							</CustomLink>
						))}
					</div>
				</div>
			</Section>

			{/* <PageHeader
				title="Hey, I'm Simon"
				content="A software engineer specializing in building exceptional digital experiences."
				// subtitle={{
				// 	text: 'Welcome',
				// 	Icon: IconComponent,
				// }}
				className="text-center"
			/> */}

			<Section borderOrigin={null} className="">
				<BentoGrid>
					<BentoCardAbout />
					<BentoCardGallery images={galleryImages} />
					<BentoCardProjects />
					{latestPost && <BentoCardBlog latestPost={latestPost} />}
				</BentoGrid>
			</Section>

			<Section>
				<div className="relative text-center border-y mb-5 pb-1">
					<span className="text-sm font-medium text-brand">Blog</span>
					<h2 className="text-xl">Latest Blog Posts</h2>

					<Link
						href={'/blog'}
						className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
					>
						<IconArrow className="w-4 h-4" />
					</Link>
				</div>
				<div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
					{blogPosts.slice(0, 2).map((post, idx) => (
						<Card
							key={post.slug}
							href={`/blog/${post.slug}`}
							image={post.image}
							imageMeta={post.imageMeta}
						>
							<CardBody title={post.title} icon={IconDocument}>
								{post.summary}
							</CardBody>
							<CardFooter>
								<time className="text-foreground-tertiary">{formatDate(post.date, true)}</time>
								<span className="text-foreground-tertiary">·</span>
								<p className="text-foreground-tertiary">{post.readingTime}</p>
							</CardFooter>
						</Card>
					))}
				</div>
			</Section>
		</main>
	);
}
