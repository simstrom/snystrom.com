'use client';

import CursorGlow from '@/components/ui/cursorGlow';
import { incrementLikes } from '@/lib/actions';
import { useIsMounted } from '@/lib/hooks';
import { IconClap, IconClapFill } from '@/lib/icons';
import { cn, safeLocalStorageGetItem } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useState } from 'react';

export default function LikeButton({ likes, slug }: { likes: number; slug: string }) {
	const isMounted = useIsMounted();
	const [activeLikes, setActiveLikes] = useState(likes);
	const isLiked = safeLocalStorageGetItem(slug) === 'true';
	const [showClaps, setShowClaps] = useState(false);

	const handleLike = () => {
		setShowClaps(true);

		if (!isLiked) {
			setActiveLikes((prev) => prev + 1);
			incrementLikes(slug);
			localStorage.setItem(slug, 'true');
		}

		setTimeout(() => {
			setShowClaps(false);
		}, 1000);
	};

	if (!isMounted) return;

	return (
		<motion.button
			onClick={handleLike}
			type="button"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ type: 'spring', stiffness: 180, damping: 10, mass: 1.5 }}
			className={cn(
				'like-btn relative w-fit min-w-32 h-12 rounded-full font-medium text-lg',
				isLiked && 'text-foreground-inverse dark:text-foreground bg-brand/80'
			)}
		>
			<Suspense>
				<CursorGlow
					containerClass="inline-flex items-center justify-center gap-x-3 rounded-full"
					cursorClass="bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(86,134,245,0)_60%)]"
					strength={20}
					size={150}
				>
					{!isLiked ? <IconClap width={24} height={24} /> : <IconClapFill width={24} height={24} />}
					{activeLikes}
				</CursorGlow>
			</Suspense>

			<AnimatePresence>
				{showClaps && (
					<motion.div
						initial={{ opacity: 1, y: 0 }}
						animate={{ opacity: 1, y: -50 }}
						exit={{ opacity: 0, y: 0 }}
						transition={{ type: 'spring', stiffness: 250, damping: 18 }}
						className="absolute inset-0 flex justify-center items-center"
					>
						<IconClap width={24} height={24} />
						<span className="text-xs -rotate-12 absolute translate-x-7 -translate-y-5">*CLAP!</span>
						<span className="text-xs -rotate-12 absolute translate-x-8 -translate-y-1">CLAP!*</span>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.button>
	);
}
