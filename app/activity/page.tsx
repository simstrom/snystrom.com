import CustomLink from '@/components/blog/link';
import Calendar from '@/components/ui/calendar';
import PageHeader from '@/components/ui/pageHeader';
import {
	IconActivity,
	IconCaretUp,
	IconCheck,
	IconHike,
	IconKayak,
	IconRide,
	IconRun,
	IconSnow,
	IconWeight,
} from '@/lib/icons';
import { getActivities, getActivityImages } from '@/lib/strava';
import { Activity, ActivityTypes } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';

type ActivityStats = {
	count: number;
	duration: number;
	lastDuration: number;
	distance: number;
	lastDistance: number;
	distanceIncrease?: number; // Optional for type safety
	durationIncrease?: number; // Optional for type safety
};

type ActivitiesStatistics = {
	activities: {
		count: number;
		countIncrease: number;
	};
} & {
	[key in ActivityTypes]: ActivityStats; // Using a mapped type for dynamic keys
};

const ActivityIcons: Record<ActivityTypes, JSX.Element> = {
	Run: <IconRun />,
	WeightTraining: <IconWeight />,
	Ride: <IconRide />,
	Kayaking: <IconKayak />,
	Canoeing: <IconKayak />,
	Hike: <IconHike />,
	NordicSki: <IconSnow />,
	BackcountrySki: <IconSnow />,
	Workout: <IconCheck />,
};

const getActivityIcon = (type: ActivityTypes) => {
	return ActivityIcons[type] || <IconActivity />;
};

export const metadata: Metadata = {
	title: 'About Me',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

const formatDuration = (seconds: number) => {
	const hours = Math.floor(seconds / 3600); // Calculate hours
	const minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
	const remainingSeconds = seconds % 60;

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m ${remainingSeconds}s`;
};

const formatPace = (ms: number) => {
	if (ms === 0) return 0;
	const paceInMinutesPerKm = 1000 / (ms * 60); // Convert to min/km
	const minutes = Math.floor(paceInMinutesPerKm);
	const seconds = Math.round((paceInMinutesPerKm - minutes) * 60);
	return `${minutes}:${String(seconds).padStart(2, '0')} /km`; // Format as mm:ss
};

const formatDistance = (meters: number) => {
	const kilometers = meters / 1000;
	return `${kilometers.toFixed(2)}km`;
};

const formatRelativeDate = (date: Date): string => {
	const now = new Date();
	const diffTime = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 'Today';
	} else if (diffDays === 1) {
		return 'Yesterday';
	} else if (diffDays < 7) {
		return `Last ${date.toLocaleDateString('en-US', { weekday: 'short' })}`;
	} else {
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'short' });
		return `${day} ${month}`;
	}
};

const extractStatistics = (currentMonthActivities: Activity[], lastMonthActivities: Activity[]) => {
	// Map for tracking statistics for each activity type
	const activityTypes: Record<ActivityTypes, ActivityStats> = Object.keys(ActivityTypes).reduce(
		(acc, type) => {
			const activityType = type as ActivityTypes; // Type assertion to ensure it's an ActivityType
			acc[activityType] = {
				count: 0,
				duration: 0,
				lastDuration: 0,
				distance: 0,
				lastDistance: 0,
			};
			return acc;
		},
		{} as Record<ActivityTypes, ActivityStats>
	);

	const stats: ActivitiesStatistics = {
		activities: {
			count: currentMonthActivities.length,
			countIncrease: Math.max(0, currentMonthActivities.length - lastMonthActivities.length),
		},
		...activityTypes, // Spread the activity types into stats
	};

	currentMonthActivities.forEach((activity) => {
		if (activity.type in stats) {
			const typeStats = stats[activity.type as ActivityTypes];
			typeStats.count++;
			typeStats.duration += activity.moving_time;
			if (activity.type === ActivityTypes.Run) {
				typeStats.distance += activity.distance;
			}
		}
	});

	lastMonthActivities.forEach((activity) => {
		if (activity.type in stats) {
			const typeStats = stats[activity.type as ActivityTypes];
			typeStats.lastDuration += activity.moving_time;
			if (activity.type === ActivityTypes.Run) {
				typeStats.lastDistance += activity.distance;
			}
		}
	});

	// Calculate increases
	for (const type in stats) {
		if (type !== 'activities') {
			const typeStats = stats[type as ActivityTypes];
			typeStats.distanceIncrease = Math.max(0, typeStats.distance - typeStats.lastDistance);
			typeStats.durationIncrease = Math.max(0, typeStats.duration - typeStats.lastDuration);
		}
	}

	return stats;
};

export default async function Activities() {
	const { currentMonthActivities, lastMonthActivities } = await getActivities();
	const allActivities = [...lastMonthActivities, ...currentMonthActivities].reverse();

	const stats = extractStatistics(currentMonthActivities, lastMonthActivities);

	const featuredActivities = allActivities
		.filter((activity) => activity.total_photo_count > 0)
		.slice(0, 2);
	const activityImages = await Promise.all(
		featuredActivities.map((activity) => getActivityImages(activity.id))
	);

	return (
		<main className="grow max-w-screen-lg mx-auto pt-32 sm:pt-40">
			<div className="absolute -translate-y-6 text-sm font-medium text-foreground-secondary">
				Health
			</div>
			<PageHeader
				title="Activities Dashboard"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="mb-4 md:mb-8"
			/>
			<div className="my-8 pt-4 sm:pt-12 grid lg:grid-cols-12 gap-5 mb-10 animate-slide">
				<div className="lg:col-span-8">
					<div className="flex flex-col sm:flex-row gap-4">
						{featuredActivities.map((activity, idx) => (
							// <ActivityCard key={activity.id} activity={activity} /> // Create ActivityCard component + fetch image
							<div
								key={`featured-${idx}`}
								className={cn(
									'relative w-full min-h-96 overflow-hidden rounded-xl p-4 flex flex-col border',
									idx > 0 && 'hidden sm:block'
								)}
							>
								<div className="mt-auto ml-auto flex flex-col gap-2 text-foreground-inverse dark:text-foreground z-10">
									<div className="flex items-center gap-x-3 text-right text-foreground-inverse/70 dark:text-foreground-secondary">
										{getActivityIcon(activity.type as ActivityTypes)}
										{formatRelativeDate(activity.start_date)}
									</div>

									<div className="flex flex-col items-end gap-2 text-lg">
										<div className="text-right flex flex-col">
											<div>{formatDuration(activity.moving_time)}</div>
											<span className="text-foreground-inverse/70 dark:text-foreground-secondary text-sm -mt-1">
												Duration
											</span>
										</div>
										{activity.average_speed > 0 && (
											<div className="text-right flex flex-col">
												<div>{formatPace(activity.average_speed)}</div>
												<span className="text-foreground-inverse/70 dark:text-foreground-secondary text-sm -mt-1">
													Pace
												</span>
											</div>
										)}
										{activity.distance > 0 && (
											<div className="text-right flex flex-col">
												<div>{formatDistance(activity.distance)}</div>
												<span className="text-foreground-inverse/70 dark:text-foreground-secondary text-sm -mt-1">
													Distance
												</span>
											</div>
										)}
									</div>
								</div>
								<div className="absolute inset-0 bg-gradient-to-l from-black to-40% to-transparent" />
								<Image
									priority
									height={390}
									width={660}
									src={activityImages[idx]}
									alt=""
									className="absolute inset-0 w-full h-full object-cover object-center -z-10"
								/>
							</div>
						))}
					</div>
					<div className="mt-5 w-full">
						{allActivities.map((activity) => {
							if (featuredActivities.includes(activity)) return; // Filter out already featured activities

							return (
								<div
									key={`activityInfo-${activity.id}`}
									className="text-foreground-secondary border-t border-b pt-4 mt-8 md:border-t-0 md:mt-0 md:pt-0 flex flex-col w-full items-start"
								>
									<div className="text-foreground pb-2 md:pt-4 px-2 flex items-center gap-4 mr-auto">
										<span className="text-foreground-secondary/50">
											{getActivityIcon(activity.type as ActivityTypes)}
										</span>
										{activity.name}
									</div>
									<div className="flex w-full items-center">
										<div className="px-3 py-2 text-sm md:px-4 border-r flex flex-col text-foreground">
											<span className="text-foreground-secondary">Duration</span>
											{formatDuration(activity.moving_time)}
										</div>
										{activity.average_speed > 0 && (
											<div className="px-3 py-2 text-sm md:px-4 border-r flex flex-col text-foreground">
												<span className="text-foreground-secondary">Pace</span>
												{formatPace(activity.average_speed)}
											</div>
										)}
										{activity.distance > 0 && (
											<div className="px-3 py-2 text-sm md:px-4 border-r flex flex-col text-foreground">
												<span className="text-foreground-secondary">Distance</span>
												{formatDistance(activity.distance)}
											</div>
										)}
										<div className="px-3 py-2 text-sm md:px-4 ml-auto text-foreground-secondary">
											{formatRelativeDate(activity.start_date)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="mt-8 w-full text-center text-foreground-secondary text-xs opacity-80">
						<span className="mr-1">Powered by</span>
						<CustomLink href="https://www.strava.com/athletes/104671575" className="pb-1">
							Strava
						</CustomLink>
					</div>
				</div>

				<aside className="lg:col-span-4 -order-1 h-fit p-5 py-7 border rounded-xl shadow-shadow bg-background-secondary lg:sticky lg:order-1 top-24 right-0">
					<h2 className="text-xl mb-4">
						{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
					</h2>
					<Calendar activityDates={currentMonthActivities.map((activity) => activity.start_date)} />
					<div className="pt-5 flex flex-col gap-5">
						<div className="pl-8">
							<h4 className="text-sm tracking-normal text-foreground-secondary">Activities</h4>
							<div className="flex justify-between items-center">
								<div className="font-medium text-lg">{stats.activities.count}</div>
								<div className="flex items-center gap-1 text-foreground-secondary text-sm">
									{stats.activities.countIncrease ?? 0}
									<IconCaretUp
										className={cn(
											'w-4 h-4 -mr-1',
											stats.activities.countIncrease ? 'text-brand' : 'text-foreground-secondary'
										)}
									/>
								</div>
							</div>
						</div>

						<hr />

						<div className="pl-8 flex flex-col gap-3">
							<div className="flex items-center gap-3 -ml-8">
								<IconRun className="text-foreground-secondary" />
								<h3 className="w-full text-lg flex justify-between items-center">
									Runs <span>{stats.Run.count}</span>
								</h3>
							</div>

							<div>
								<h4 className="text-sm tracking-normal text-foreground-secondary">Duration</h4>
								<div className="flex justify-between items-center">
									<div className="font-medium text-lg">{formatDuration(stats.Run.duration)}</div>
									<div className="flex items-center gap-1 text-foreground-secondary text-sm">
										{stats.Run.durationIncrease
											? formatDuration(stats.Run.durationIncrease)
											: '0h 0m'}
										<IconCaretUp
											className={cn(
												'w-4 h-4 -mr-1',
												stats.Run.durationIncrease ? 'text-brand' : 'text-foreground-secondary'
											)}
										/>
									</div>
								</div>
							</div>
							<div>
								<h4 className="text-sm tracking-normal text-foreground-secondary">Distance</h4>
								<div className="flex justify-between items-center">
									<div className="font-medium text-lg">{formatDistance(stats.Run.distance)}</div>
									<div className="flex items-center gap-1 text-foreground-secondary text-sm">
										{stats.Run.distanceIncrease
											? formatDistance(stats.Run.distanceIncrease)
											: '0km'}
										<IconCaretUp
											className={cn(
												'w-4 h-4 -mr-1',
												stats.Run.distanceIncrease ? 'text-brand' : 'text-foreground-secondary'
											)}
										/>
									</div>
								</div>
							</div>
						</div>

						<hr />

						<div className="pl-8 flex flex-col gap-3">
							<div className="flex items-center gap-3 -ml-8">
								<IconWeight className="text-foreground-secondary" />
								<h3 className="w-full text-lg flex justify-between items-center">
									Weights <span>{stats.WeightTraining.count}</span>
								</h3>
							</div>

							<div>
								<h4 className="text-sm tracking-normal text-foreground-secondary">Duration</h4>
								<div className="flex justify-between items-center">
									<div className="font-medium text-lg">
										{formatDuration(stats.WeightTraining.duration)}
									</div>
									<div className="flex items-center gap-1 text-foreground-secondary text-sm">
										{stats.WeightTraining.durationIncrease
											? formatDuration(stats.WeightTraining.durationIncrease)
											: '0h 0m'}
										<IconCaretUp
											className={cn(
												'w-4 h-4 -mr-1',
												stats.Run.durationIncrease ? 'text-brand' : 'text-foreground-secondary'
											)}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</main>
	);
}
