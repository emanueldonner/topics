export async function GET({ locals }) {
	const { supabase, user } = locals;
	const { data, error } = await supabase
		.from('topics')
		.select('*')
		.order('created_at', { ascending: false })
		.match({ user_id: user.id });
	if (error) {
		console.error(error);
		return new Response(error.message, {
			status: 500
		});
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
