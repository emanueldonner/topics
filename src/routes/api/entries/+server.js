import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const { supabase, user } = locals;
	const { data, error } = await supabase
		.from('entries')
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

export async function POST({ request, locals }) {
	const { supabase, user } = locals;
	const { id, type, url, title, description, user_note, author, image } = await request.json();

	try {
		const { data, error } = await supabase
			.from('entries')
			.upsert({
				id: id || undefined, // Use `undefined` if `id` is not provided
				user_id: user.id,
				type,
				url,
				title,
				description,
				user_note,
				author,
				image
			})
			.select('*');

		if (error) {
			console.error('POST Upsert Error:', error);
			return new Response(JSON.stringify({ message: error.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify(data[0]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('POST Exception:', err);
		return new Response(JSON.stringify({ message: err.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function DELETE({ request, locals }) {
	const { id } = await request.json();
	const { supabase, user } = locals;

	const { data, error } = await supabase
		.from('entries')
		.delete()
		.eq('id', id)
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
