import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Dialog({
	children,
	isOpen,
	setIsOpen,
	className,
}: {
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
}) {
	const handleEscapeKey = (e: any) => {
		if (e.key === 'Escape') {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					role="dialog"
					id="overlay"
					className="fixed top-0 left-0 w-screen min-h-screen bg-background/20 backdrop-blur flex items-center justify-center z-100"
					onClick={(e: any) => {
						e.target.id === 'overlay' && setIsOpen(false);
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={cn(
							'relative max-w-md w-full min-h-60 bg-background border border-border/10 rounded-3xl mx-4',
							className
						)}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
