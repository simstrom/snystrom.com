'use client';

import { AuroraBackground } from '@/components/ui/aurora';
import { motion } from 'framer-motion';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center gap-20">
			<AuroraBackground showRadialGradient={true}>
				<motion.div
					initial={{ opacity: 0.0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
					}}
					className="max-w-screen-lg relative flex flex-col gap-4 justify-center px-6 lg:px-0"
				>
					<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight">
						Background lights are cool you know.
					</h1>
					<div className="md:text-4xl py-4">And this, is chemical burn.</div>
					<button className="bg-background border backdrop-blur-md shadow-sm rounded-xl w-fit px-10 py-3 uppercase text-sm tracking-wide font-medium">
						Debug now
					</button>
				</motion.div>
			</AuroraBackground>
			<div>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus in ipsa debitis
					delectus reiciendis incidunt illo non eveniet maxime qui, possimus quaerat sapiente
					ducimus, placeat sunt accusantium! Quisquam, perspiciatis laboriosam. Lorem ipsum dolor,
					sit amet consectetur adipisicing elit. Consequatur est laudantium ducimus modi libero
					officiis. Vitae voluptatem molestias mollitia aliquam laboriosam ut a quas, fugit velit
					iure perspiciatis quidem cumque.
				</p>
			</div>
		</main>
	);
}
