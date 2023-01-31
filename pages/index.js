import Contact from '../components/Contact';
import Container from '../components/Container';
import FeaturedPost from '../components/FeaturedPost';
import FeaturedProject from '../components/FeaturedProject';
import SectionHeader from '../components/SectionHeader';

export default function Home() {
	return (
		<Container>
			<daiv className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1">Hello World</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit sit voluptates
					dolorum assumenda illo veniam ullam voluptas? Similique impedit quaerat dolore adipisci
					optio id aliquam praesentium quis tempore. Modi? Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Sed impedit consectetur modi natus ad. Quos, quasi delectus. Asperiores
					repellat doloribus ducimus, assumenda delectus explicabo dolore, laborum, facilis itaque
					iusto reprehenderit? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
					optio consectetur assumenda officiis, dicta cumque tenetur quasi aliquam possimus nostrum
					asperiores ad voluptatibus, rerum placeat quae ab perspiciatis laborum dolor!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit sit voluptates
					dolorum assumenda illo veniam ullam voluptas? Similique impedit quaerat dolore adipisci
					optio id aliquam praesentium quis tempore. Modi? Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Sed impedit consectetur modi natus ad. Quos, quasi delectus. Asperiores
					repellat doloribus ducimus, assumenda delectus explicabo dolore, laborum, facilis itaque
					iusto reprehenderit? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
					optio consectetur assumenda officiis, dicta cumque tenetur quasi aliquam possimus nostrum
					asperiores ad voluptatibus, rerum placeat quae ab perspiciatis laborum dolor!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit sit voluptates
					dolorum assumenda illo veniam ullam voluptas? Similique impedit quaerat dolore adipisci
					optio id aliquam praesentium quis tempore. Modi? Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Sed impedit consectetur modi natus ad. Quos, quasi delectus. Asperiores
					repellat doloribus ducimus, assumenda delectus explicabo dolore, laborum, facilis itaque
					iusto reprehenderit? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
					optio consectetur assumenda officiis, dicta cumque tenetur quasi aliquam possimus nostrum
					asperiores ad voluptatibus, rerum placeat quae ab perspiciatis laborum dolor!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus odit sit voluptates
					dolorum assumenda illo veniam ullam voluptas? Similique impedit quaerat dolore adipisci
					optio id aliquam praesentium quis tempore. Modi? Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Sed impedit consectetur modi natus ad. Quos, quasi delectus. Asperiores
					repellat doloribus ducimus, assumenda delectus explicabo dolore, laborum, facilis itaque
					iusto reprehenderit? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
					optio consectetur assumenda officiis, dicta cumque tenetur quasi aliquam possimus nostrum
					asperiores ad voluptatibus, rerum placeat quae ab perspiciatis laborum dolor!
				</p>
				<section className="w-full mb-20">
					<FeaturedProject />
				</section>

				<section className="w-full mb-20">
					<SectionHeader num="04" btnText="View All Articles" href="/blog">
						Latest Blog Posts
					</SectionHeader>
					<div className="w-full flex flex-col gap-4 sm:grid md:gap-8 grid-cols-3">
						<FeaturedPost gradientFrom={'from-emerald-300'} gradientTo={'to-blue-300'} />
						<FeaturedPost gradientFrom={'from-pink-300'} gradientTo={'to-indigo-300'} />
						<FeaturedPost gradientFrom={'from-orange-300'} gradientTo={'to-rose-300'} />
					</div>
				</section>

				<section className="w-full mb-20">
					<SectionHeader num="05">Contact</SectionHeader>
					<Contact />
				</section>
			</daiv>
		</Container>
	);
}
