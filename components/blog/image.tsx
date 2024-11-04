import { cn } from '@/lib/utils';
import { readFileSync } from 'fs';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

type CustomImageProps = {
	src: string;
	alt: string;
	caption?: string;
	priority?: boolean;
};

export default async function CustomImage({
	src,
	alt,
	caption,
	priority = false,
}: CustomImageProps) {
	const buffer = readFileSync(`./public${src}`);
	const { base64, metadata } = await getPlaiceholder(buffer);

	return (
		<figure>
			<Image
				src={src}
				width={metadata.width}
				height={metadata.height}
				alt={alt}
				className="w-full h-auto rounded-xl border"
				priority={priority}
				placeholder="blur"
				blurDataURL={base64}
				draggable={false}
			/>
			{caption && <figcaption className={cn('text-sm text-secondary')}>{caption}</figcaption>}
		</figure>
	);
}
