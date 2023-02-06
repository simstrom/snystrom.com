import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { client } from '../lib/contentful-server';

import BlogListItem from '../components/BlogListItem';
import Container from '../components/Container';
import { SearchIcon } from '../components/Icons';
import InView from '../lib/InView';

export default function Blog({ articles }) {
	const [query, setQuery] = useState('');
	const handleChange = (e) => setQuery(e.target.value);

	return (
		<Container>
			<InView>
				<div className="flex flex-col gap-8">
					<div>
						<h1 className="text-4xl">Blog</h1>
						<p className="text-base text-secondary mb-8">
							This is where I share my writings on programming, tutorials, and my experiences.
						</p>
						<div className="relative mb-2">
							<input
								type="text"
								placeholder="Search Articles"
								className="w-full text-sm text-tertiary border border-primary bg-tertiary dark:bg-secondary py-3 px-4 rounded-lg placeholder:text-secondary focus:outline-none focus:ring-1 ring-brand"
								value={query}
								onChange={handleChange}
							/>
							<div className="text-secondary absolute top-0 right-0 py-4 px-4">
								<SearchIcon />
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 sm:gap-4 mb-20 sm:mb-28">
						<AnimatePresence>
							{articles
								.filter((obj) => obj.fields.title.toLowerCase().includes(query.toLowerCase()))
								.map((article) => (
									<motion.div
										layout
										key={article.sys.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
									>
										<BlogListItem article={article.fields} />
									</motion.div>
								))}
						</AnimatePresence>
					</div>
				</div>
			</InView>
		</Container>
	);
}

export async function getStaticProps() {
	const data = await client.getEntries({
		content_type: 'article',
		order: 'sys.createdAt',
	});

	return {
		props: {
			articles: data.items.reverse(),
		},
	};
}
