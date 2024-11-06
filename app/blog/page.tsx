import { Metadata } from 'next';

import PostViewSearch from '@/components/sections/postViewSearch';
import PageHeader from '@/components/ui/pageHeader';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Discover my thoughts, insights and learnings on software development, design and beyond.',
};

export default async function Blog() {
	const posts = getBlogPosts();

	return (
		<main className="grow flex flex-col pt-32 sm:pt-40">
			<PageHeader
				title="Read My Blog"
				content="This is where I share my thoughts and experiences on all things code and design."
			/>
			<div className="pt-8 sm:pt-12 space-y-12">
				<PostViewSearch posts={posts} />
			</div>
		</main>
	);
}
