import cn from 'clsx';
import { useEffect, useState } from 'react';
import { getFromStorage, setToStorage } from '../lib/safeLocalStorage';
import { LikeIcon } from './Icons';

export default function LikeButton({ slug, likes, setLikes }) {
	const [mounted, setMounted] = useState(false);
	const [liked, setLiked] = useState(getFromStorage(slug) && true);

	useEffect(() => setMounted(true), []);

	const handleLike = async () => {
		setToStorage(slug, true);
		setLiked(true);
		setLikes((prev) => prev + 1);
		await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/likes/${slug}`, {
			method: 'POST',
		});
	};

	if (!mounted) return null;

	return (
		<div className="flex gap-2 items-center">
			<button
				className={cn(
					'rounded-lg p-2 hover:text-brand hover:bg-tertiary dark:hover:bg-tertiary/40 duration-300',
					liked ? 'text-brand' : 'text-tertiary'
				)}
				onClick={handleLike}
			>
				<LikeIcon filled={liked && true} />
			</button>
			<span className="font-medium">{likes}</span>
		</div>
	);
}
