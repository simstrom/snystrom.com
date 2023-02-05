import cn from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import Container from '../../components/Container';
import { LeftArrowIcon, LikeIcon } from '../../components/Icons';
import InView from '../../lib/InView';

export default function Post({ post }) {
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState(80);

	const handleLike = () => {
		if (!liked) {
			setLikes((prev) => prev + 1);
			setLiked(true);
			// Save to db.
		}
	};

	return (
		<Container>
			<InView>
				<article className="flex flex-col gap-12 max-w-2xl mx-auto mt-12">
					<div className="flex flex-col gap-1">
						<span className="text-secondary font-medium text-sm tracking-widest uppercase">
							Productivity
						</span>
						<h1 className="text-3xl sm:text-4xl leading-normal">
							5 Essential Tools for Streamlining Your Software Development Workflow
						</h1>
						<div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center text-sm text-secondary font-medium">
							<p>January 20, 2022</p>
							<div>
								<p className="inline">2 min read</p>
								<span> • </span>
								<p className="inline">234 views</p>
								<span> • </span>
								<p className="inline">{likes} likes</p>
							</div>
						</div>
					</div>
					<div className="text-base text-tertiary">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id condimentum sapien,
							eu porta erat. Pellentesque habitant morbi tristique senectus et netus et malesuada
							fames ac turpis egestas. In urna ex, scelerisque nec blandit non, tincidunt at massa.
							Integer mattis non est bibendum commodo. Etiam in nisl dolor. Morbi eleifend, risus et
							suscipit efficitur, elit mi fringilla lorem, in congue lacus mi quis est. Duis maximus
							nunc in ex posuere, et lobortis erat volutpat.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id condimentum sapien,
							eu porta erat. Pellentesque habitant morbi tristique senectus et netus et malesuada
							fames ac turpis egestas. In urna ex, scelerisque nec blandit non, tincidunt at massa.
							Integer mattis non est bibendum commodo. Etiam in nisl dolor. Morbi eleifend, risus et
							suscipit efficitur, elit mi fringilla lorem, in congue lacus mi quis est. Duis maximus
							nunc in ex posuere, et lobortis erat volutpat.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<button
							className={cn(
								'rounded-lg p-2 hover:text-brand hover:bg-tertiary dark:hover:bg-tertiary/40 duration-300',
								liked && 'text-brand'
							)}
							onClick={handleLike}
						>
							<LikeIcon filled={liked && true} />
						</button>
						<span className="font-medium">{likes}</span>
					</div>
					<Link
						href="/blog"
						className="flex gap-2 text-sm font-medium text-tertiary group hover:text-brand duration-300"
					>
						<div className="group-hover:-translate-x-1 transition-transform">
							<LeftArrowIcon />
						</div>
						<span>Back to All Posts</span>
					</Link>
				</article>
			</InView>
		</Container>
	);
}
