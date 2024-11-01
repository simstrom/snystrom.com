import PostList from '@/components/postList';
import PageHeader from '@/components/ui/pageHeader';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { IconArrowLeft } from '@/lib/icons';
import { getAllViews } from '@/lib/queries';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
	const tag = getAllTags().find((t) => slugify(t) == params.slug);
	if (!tag) return;

	const title = `${tag} Blog`;
	const description = `Articles and tutorials about ${tag}`;
	const url = `https://snystrom.com/blog/tag/${params.slug}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
		},
		twitter: {
			title,
			description,
		},
	};
}

export default async function TagPage({ params }: Props) {
	const tag = getAllTags().find((t) => slugify(t) == params.slug);
	if (!tag) return notFound();

	const views = await getAllViews();
	const posts = getPostsByTag(tag);

	return (
		<main className="grow max-w-3xl mx-auto flex flex-col pt-32 sm:pt-40">
			<div className="absolute -translate-y-6 text-sm font-medium text-foreground-secondary">
				Blog
			</div>
			<PageHeader title={`${tag}`} content={`Explore all articles and tutorials about ${tag}`} />
			<section className="pt-5 mb-10">
				<PostList posts={posts} views={views} />
			</section>
			<Link
				href="/blog"
				className="inline-flex w-fit items-center gap-x-1 font-mono text-xs tracking-tight hover:text-brand transition duration-300 group"
			>
				<IconArrowLeft
					width={12}
					height={12}
					className="group-hover:-translate-x-1 transition-transform duration-300"
				/>
				Back to Blog
			</Link>
		</main>
	);
}

export async function generateStaticParams() {
	const uniqueTags = getAllTags();
	return uniqueTags.map((tag) => ({ slug: slugify(tag) }));
}
