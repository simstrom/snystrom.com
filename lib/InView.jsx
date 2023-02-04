import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function InView({ children, threshold }) {
	const controls = useAnimation();
	const [ref, inView] = useInView({ threshold: threshold ? threshold : 0.2 });

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			transition={{ duration: 0.6 }}
			variants={{
				visible: {
					opacity: 1,
					y: 0,
				},
				hidden: {
					opacity: 0,
					y: 30,
				},
			}}
		>
			{children}
		</motion.div>
	);
}
