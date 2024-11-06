import { cn } from '@/lib/utils';
import lqip from 'lqip-modern';
import Image from 'next/image';

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
	const result = await lqip(`./public${src}`);

	return (
		<figure>
			<Image
				src={src}
				width={result.metadata.originalWidth}
				height={result.metadata.originalHeight}
				alt={alt}
				className="w-full h-auto rounded-xl border"
				priority={priority}
				placeholder="blur"
				blurDataURL={result.metadata.dataURIBase64}
				draggable={false}
			/>
			{caption && <figcaption className={cn('text-sm text-secondary')}>{caption}</figcaption>}
		</figure>
	);
}
