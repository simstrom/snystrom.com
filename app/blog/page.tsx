import PostViewHero from '@/components/sections/postViewHero';
import PostViewSearch from '@/components/sections/postViewSearch';
import PageHeader from '@/components/ui/pageHeader';
import { getAllTags, getBlogPosts } from '@/lib/blog';
import { getAllViews } from '@/lib/queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Discover my thoughts, insights and learnings on software development, design and beyond.',
};

export default async function Blog() {
	const blogPosts = getBlogPosts();
	const allUniqueTags = getAllTags();
	const allViews = await getAllViews();

	return (
		<main className="flex flex-col pt-32 sm:pt-40">
			<PageHeader
				title="Read My Blog"
				content="This is where I share my thoughts and experiences on all things code and design."
			/>
			<div className="pt-8 sm:pt-12 space-y-12">
				<PostViewHero posts={blogPosts} views={allViews} uniqueTags={allUniqueTags} />
				<PostViewSearch posts={blogPosts} views={allViews} />
			</div>
		</main>
	);
}
