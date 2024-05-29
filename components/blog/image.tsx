import { cn } from '@/lib/utils';
import Image from 'next/image';

type CustomImageProps = {
	src: string;
	width: number;
	height: number;
	alt: string;
	caption?: string;
	priority?: boolean;
};

export default function CustomImage({
	src,
	width,
	height,
	alt,
	caption,
	priority,
}: CustomImageProps) {
	return (
		<figure>
			<Image
				src={src}
				width={width}
				height={height}
				alt={alt}
				className="w-full h-auto rounded-xl border"
				priority={priority}
				draggable={false}
			/>
			{caption && <figcaption className={cn('text-sm text-secondary')}>{caption}</figcaption>}
		</figure>
	);
}
