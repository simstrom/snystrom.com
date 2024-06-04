import GalleryBlock from '@/components/sections/galleryBlock';
import PostViewHero from '@/components/sections/postViewHero';
import Button from '@/components/ui/button';
import { getAllTags, getBlogPosts } from '@/lib/blog';
import { getLandingImages } from '@/lib/gallery';
import { getAllViews } from '@/lib/queries';
// import { motion } from 'framer-motion';

export default async function Home() {
	const images = await getLandingImages();
	const blogPosts = getBlogPosts();
	const allUniqueTags = getAllTags();
	const allViews = await getAllViews();

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

			<section className="w-full">
				<div className="flex items-end justify-between mb-4">
					<div>
						<div className="font-mono uppercase text-xs text-foreground-secondary tracking-wide">
							<span className="text-brand">• </span>
							Blog
						</div>
						<h2 className="text-2xl">Latest Articles and Tutorials</h2>
					</div>
					<Button variant="link" href="/blog" className="pr-4">
						Browse all articles
					</Button>
				</div>
				<PostViewHero
					posts={blogPosts}
					views={allViews}
					uniqueTags={allUniqueTags}
					showTags={false}
				/>
			</section>
		</main>
	);
}
