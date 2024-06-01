import GalleryBlock from '@/components/sections/galleryBlock';
import { getLandingImages } from '@/lib/gallery';
// import { motion } from 'framer-motion';

export default async function Home() {
	const images = await getLandingImages();

	return (
		<main className="flex flex-col items-center justify-center gap-20">
			<div className="w-full mx-auto h-[90vh] max-w-screen-lg relative flex flex-col gap-4 justify-center px-6 lg:px-0">
				<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight">
					Background lights are cool you know.
				</h1>
				<div className="md:text-4xl py-4">And this, is chemical burn.</div>
				<button className="bg-background border backdrop-blur-md shadow-sm rounded-xl w-fit px-10 py-3 uppercase text-sm tracking-wide font-medium">
					Debug now
				</button>
			</div>
			{/* <AuroraBackground showRadialGradient={true}>
				<div className="max-w-screen-lg relative flex flex-col gap-4 justify-center px-6 lg:px-0">
					<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight">
						Background lights are cool you know.
					</h1>
					<div className="md:text-4xl py-4">And this, is chemical burn.</div>
					<button className="bg-background border backdrop-blur-md shadow-sm rounded-xl w-fit px-10 py-3 uppercase text-sm tracking-wide font-medium">
						Debug now
					</button>
				</div>
			</AuroraBackground> */}
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
			<GalleryBlock images={images} />
			<div className="h-screen"></div>
		</main>
	);
}
