import { Activity } from './types';

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

const userId = 104671575;
const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token?';
const ATHLETES_ENDPOINT = `https://www.strava.com/api/v3/athletes/${userId}`;
const ACTIVITY_ENDPOINT = 'https://www.strava.com/api/v3/';

// Credit to Samuel Kraft's blog post for this snippet: https://samuelkraft.com/blog/strava-api-with-nextjs
// Made some smaller adjustments for app router

const getAccessToken = async () => {
	const body = JSON.stringify({
		client_id: clientId,
		client_secret: clientSecret,
		code: refreshToken,
		grant_type: 'authorization_code',
	});

	const res = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
		},
		body,
	});

	return res.json();
};

export const getActivities = async (): Promise<{
	currentMonthActivities: Activity[];
	lastMonthActivities: Activity[];
}> => {
	const { access_token: accessToken } = await getAccessToken();

	// Calculate epoch timestamps for fetching only past months activities
	const now = new Date();
	const startOfLastMonthInEpoch = Math.floor(
		new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime() / 1000
	);

	const res = await fetch(
		`${ATHLETES_ENDPOINT}/activities?access_token=${accessToken}&after=${startOfLastMonthInEpoch}`,
		{
			next: { revalidate: 7200 },
		}
	);
	const data = await res.json();
	const activities = data.map((activity: any) => ({
		id: activity.id,
		type: activity.type,
		start_date: new Date(activity.start_date),
		name: activity.name,
		moving_time: activity.moving_time,
		distance: activity.distance,
		average_speed: activity.average_speed,
		total_photo_count: activity.total_photo_count,
	})) as Activity[];

	const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const currentMonthActivities = activities.filter((activity) => {
		return activity.start_date >= startOfCurrentMonth;
	});

	const lastMonthActivities = activities.filter((activity) => {
		return activity.start_date >= startOfLastMonth && activity.start_date < startOfCurrentMonth;
	});

	return { currentMonthActivities, lastMonthActivities };
};

export const getActivityImages = async (id: number) => {
	const { access_token: accessToken } = await getAccessToken();
	const res = await fetch(`${ACTIVITY_ENDPOINT}/activities/${id}?access_token=${accessToken}`, {
		next: { revalidate: 7200 },
	});
	const data = await res.json();

	const images = data.photos.primary.urls;
	return images[600];
};
