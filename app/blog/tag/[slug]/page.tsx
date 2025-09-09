import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import Button from '@/components/ui/Button';
import PostList from '@/components/ui/PostList';
import { SITE_URL } from '@/data/constants';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { slugify } from '@/lib/utils';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
	const params = await props.params;
	const tag = getAllTags().find((t) => slugify(t) == params.slug);
	if (!tag) return;

	const title = `${tag} Blog`;
	const description = `Articles and tutorials about ${tag}`;
	const url = `${SITE_URL}/blog/tag/${params.slug}`;

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

export default async function TagPage(props: Props) {
	const params = await props.params;
	const tag = getAllTags().find((t) => slugify(t) == params.slug);
	if (!tag) return notFound();

	const posts = getPostsByTag(tag);

	return (
		<main className="">
			<div className="relative max-w-5xl mx-auto">
				<Button
					variant="link"
					href="/blog"
					backLink
					className="top-28 text-foreground-secondary hover:bg-foreground hover:text-background transition-colors pl-6 pr-8 py-4"
				>
					Blog
				</Button>

				<PageHeader
					title={tag}
					content={`Explore all articles and tutorials about ${tag}`}
					className="pt-32 pb-12 bg-background-secondary"
				/>
			</div>

			<Section className="pb-0" borderOrigin={'t'}>
				<PostList posts={posts} />
			</Section>
		</main>
	);
}

export async function generateStaticParams() {
	const uniqueTags = getAllTags();
	return uniqueTags.map((tag) => ({ slug: slugify(tag) }));
}
