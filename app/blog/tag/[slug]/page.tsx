import PostList from '@/components/postList';
import Button from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { getAllViews } from '@/lib/queries';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
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
		<main className="grow max-w-2xl w-full mx-auto flex flex-col pt-32 sm:pt-40">
			<Button
				variant="link"
				href="/blog"
				backLink
				className="text-foreground-secondary hover:text-foreground transition-colors mb-8"
			>
				Blog
			</Button>
			<PageHeader
				title={`${tag}`}
				className="text-2xl sm:text-2xl"
				content={`Explore all articles and tutorials about ${tag}`}
			/>
			<section className="pt-5 mb-10">
				<PostList posts={posts} views={views} />
			</section>
		</main>
	);
}

export async function generateStaticParams() {
	const uniqueTags = getAllTags();
	return uniqueTags.map((tag) => ({ slug: slugify(tag) }));
}
