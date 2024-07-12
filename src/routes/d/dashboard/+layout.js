export const load = async ({ fetch }) => {
	const entriesResponse = await fetch('/api/entries');
	const topicsResponse = await fetch('/api/topics');

	const entries = await entriesResponse.json();
	const topics = await topicsResponse.json();

	console.log('topics', topics);
	return { entries, topics };
};
