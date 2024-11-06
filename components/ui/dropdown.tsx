import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DropdownProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
	children?: React.ReactNode;
}

export default function Dropdown({ isOpen, setIsOpen, children, className }: DropdownProps) {
	return (
		<motion.div
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			exit={{ height: 0 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
			aria-expanded={isOpen}
			aria-label="Dropdown"
			className="overflow-hidden"
		>
			<div className="py-2 w-full grid grid-cols-12 auto-rows-fr gap-2">
				<div
					className={cn(
						`relative col-span-8 row-span-3 text-[13px] font-medium text-foreground p-4 rounded-xl bg-background-secondary dark:bg-background-tertiary dark:hover:bg-[#181a20] transition duration-300 group`,
						className
					)}
				>
					<span className="z-20 relative">Gallery</span>
					<Image
						fill
						src="/images/gallery.png"
						alt=""
						className="absolute inset-0 rounded-xl object-cover object-left grayscale group-hover:grayscale-0 transition duration-300"
						style={{
							maskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
							WebkitMaskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
						}}
					/>
					<div
						className="z-10 absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-100 group-hover:opacity-50"
						style={{
							background:
								'linear-gradient(to bottom right, hsl(var(--background-tertiary)) 0%, rgba(0,0,0,0) 200%)',
						}}
					></div>
				</div>
				<div
					className={cn(
						'relative col-span-4 row-span-1 text-[13px] font-medium text-foreground p-4 rounded-xl bg-background-secondary dark:bg-background-tertiary dark:hover:bg-[#181a20] transition duration-300 group',
						className
					)}
				>
					<span className="z-20 relative">Colophon</span>
					<Image
						fill
						src="/images/design.png"
						alt=""
						className="absolute inset-0 translate-x-5 rounded-xl object-cover object-left grayscale group-hover:grayscale-0 transition duration-300"
						style={{
							maskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
							WebkitMaskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
						}}
					/>
					<div
						className="z-10 absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-100 group-hover:opacity-50"
						style={{
							background:
								'linear-gradient(to bottom right, hsl(var(--background-tertiary)) 0%, rgba(0,0,0,0) 200%)',
						}}
					></div>
				</div>
				<div
					className={cn(
						'relative col-span-4 row-span-1 text-[13px] overflow-hidden font-medium text-foreground p-4 rounded-xl bg-background-secondary dark:bg-background-tertiary dark:hover:bg-[#181a20] transition duration-300 group',
						className
					)}
				>
					<span className="z-20 relative">Activity</span>
					<Image
						fill
						src="/images/activity.png"
						alt=""
						className="absolute inset-0 translate-x-5 rounded-xl object-cover object-left grayscale group-hover:grayscale-0 transition duration-300"
						style={{
							maskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
							WebkitMaskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
						}}
					/>
					<div
						className="z-10 absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-100 group-hover:opacity-50"
						style={{
							background:
								'linear-gradient(to bottom right, hsl(var(--background-tertiary)) 0%, rgba(0,0,0,0) 200%)',
						}}
					></div>
				</div>

				<div
					className={cn(
						'relative col-span-4 row-span-2 overflow-hidden text-[13px] font-medium text-foreground p-4 rounded-xl bg-background-secondary dark:bg-background-tertiary dark:hover:bg-[#181a20] transition duration-300 group',
						className
					)}
				>
					<span className="z-20 relative">Contact</span>
					<Image
						fill
						src="/images/contact.png"
						alt=""
						className="absolute w-full inset-0 translate-x-10 rounded-xl object-cover object-left grayscale group-hover:grayscale-0 transition duration-300"
						style={{
							maskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
							WebkitMaskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
						}}
					/>
					<div
						className="z-10 absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-100 group-hover:opacity-50"
						style={{
							background:
								'linear-gradient(to bottom right, hsl(var(--background-tertiary)) 0%, rgba(0,0,0,0) 200%)',
						}}
					></div>
				</div>
				<div
					className={cn(
						'relative col-span-8 row-span-1 text-[13px] font-medium text-foreground p-4 rounded-xl bg-background-secondary dark:bg-background-tertiary dark:hover:bg-[#181a20] transition duration-300 group',
						className
					)}
				>
					<span className="z-20 relative">Resume</span>
					<Image
						fill
						src="/images/resume.png"
						alt=""
						className="absolute inset-0 translate-x-8 rounded-xl object-cover object-left grayscale group-hover:grayscale-0 transition duration-300"
						style={{
							maskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
							WebkitMaskImage:
								'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
						}}
					/>
					<div
						className="z-10 absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-100 group-hover:opacity-50"
						style={{
							background:
								'linear-gradient(to bottom right, hsl(var(--background-tertiary)) 0%, rgba(0,0,0,0) 200%)',
						}}
					></div>
				</div>
			</div>
		</motion.div>
	);
}
