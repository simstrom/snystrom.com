import PostView from '@/components/sections/postView';
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
		<main className="flex flex-col pt-32 sm:pt-40 pb-20 sm:pb-40">
			<PageHeader
				title="Read My Blog"
				content="This is where I share my thoughts and experiences on all things code and design."
			/>
			<div className="pt-8 sm:pt-12 space-y-12">
				<PostView posts={blogPosts} views={allViews} uniqueTags={allUniqueTags} />
			</div>
		</main>
	);
}
