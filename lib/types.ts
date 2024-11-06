import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type Project = {
	title: string;
	description: string;
	stack: Array<string>;
	githubLink?: string;
	deployLink?: string;
	image?: string | StaticImport;
};

export type Views =
	| {
			slug: string;
			views: number;
	  }[]
	| null;

export type GalleryCollection = {
	title: string;
	description: string;
	cover: GalleryImage;
};
export type GalleryImage = {
	id: string;
	src: string;
	blurData: string;
	width: number;
	height: number;
	alt?: string;
	metadata: { collections?: string[]; destinations?: string[] };
	tags: string[];
};

export type NavItem = {
	name: string;
	path: string;
	icon?: React.ReactNode;
	upcoming?: boolean;
};
export type Navigation = {
	navigationLinks: NavItem[];
	exploreLinks: NavItem[];
	connectLinks: NavItem[];
	socialLinks: NavItem[];
};

export type Activity = {
	id: number;
	type: ActivityTypes | string;
	start_date: Date;
	name: string;
	moving_time: number; // in seconds
	distance: number; // in meters
	average_speed: number; // in m/s
	total_photo_count: number;
	imageUrl?: string;
};

// Imported from Strava API Docs
export enum ActivityTypes {
	Run = 'Run',
	WeightTraining = 'WeightTraining',
	Ride = 'Ride',
	Kayaking = 'Kayaking',
	Canoeing = 'Canoeing',
	Hike = 'Hike',
	NordicSki = 'NordicSki',
	BackcountrySki = 'BackcountrySki',
	Workout = 'Workout',
}
