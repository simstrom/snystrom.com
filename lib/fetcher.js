export default async function fetcher(input) {
	const res = await fetch(input);
	return res.json();
}
