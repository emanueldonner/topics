// get user by id from supabase

export const load = async ({ params, locals: { supabase } }) => {
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.error(error);
		return new Response(error.message, {
			status: 500
		});
	}
	console.log('data', data);
	return { data };
};
