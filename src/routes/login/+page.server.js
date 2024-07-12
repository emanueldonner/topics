import { redirect } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		// signup and create also a profile with the user's id
		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error || !data) {
			console.error(error);
			return redirect(303, '/login/error');
		}
		// generate profile name from first part of email
		const profileName = data.user.email.split('@')[0];

		const { data: profileData, error: profileError } = await supabase.from('profiles').insert([
			{
				user_id: data.user.id,
				name: profileName
			}
		]);

		if (profileError) {
			console.error(profileError);
			return redirect(303, '/login/error');
		}

		return redirect(303, '/d/dashboard');
	},
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			return redirect(303, '/login/error');
		} else {
			return redirect(303, '/d');
		}
	}
};
