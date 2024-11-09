'use client';

import { useFocusTrap, useIsMounted, useScrollLock } from '@/lib/hooks';
import { IconX } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	trigger: React.ReactNode | string;
	children: React.ReactNode;
	containerClassName?: string;
	triggerClassName?: string;
	className?: string;
}

const Modal = ({
	trigger,
	children,
	containerClassName,
	triggerClassName,
	className,
}: ModalProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { focusRef } = useFocusTrap(isOpen, () => setIsOpen(false), false);
	const mounted = useIsMounted();
	useScrollLock(isOpen);

	return (
		<>
			<ModalTrigger onOpen={() => setIsOpen(true)} className={triggerClassName}>
				{trigger}
			</ModalTrigger>

			{mounted &&
				createPortal(
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
								aria-hidden={!isOpen}
								className={cn(
									'fixed inset-0 z-[99] flex items-center justify-center bg-foreground/10 dark:bg-background/50 backdrop-blur-md'
								)}
								onClick={() => setIsOpen(false)}
							>
								<motion.div
									initial={{ scale: 0.9 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0.9 }}
									transition={{ duration: 0.2, ease: 'easeOut' }}
									ref={focusRef}
									tabIndex={-1}
									role="dialog"
									aria-expanded={isOpen}
									className={cn(
										'fixed z-[100] max-w-md w-[95%] origin-center',
										'grid rounded-xl p-3 xs:p-6 pt-8 xs:pt-10 border shadow-md',
										'bg-background/50 bg-gradient-to-br from-background-tertiary to-background/50 bg-clip-padding outline-none',
										containerClassName
									)}
									onClick={(e) => e.stopPropagation()}
								>
									<button
										className="absolute top-4 right-6 p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-foreground-secondary/10 dark:hover:bg-foreground/10 transition-colors"
										type="button"
										aria-label="Close modal"
										onClick={() => setIsOpen(false)}
									>
										<IconX />
									</button>
									<ModalContent className={className}>{children}</ModalContent>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</>
	);
};

interface ModalTriggerProps {
	children: React.ReactNode;
	onOpen: () => void;
	className?: string;
}

const ModalTrigger = ({ onOpen, children, className }: ModalTriggerProps) => {
	return (
		<button onClick={onOpen} className={cn(className)}>
			{children}
		</button>
	);
};

interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
	return <div className={cn(className)}>{children}</div>;
};

export default Modal;
export { ModalContent, ModalTrigger };
