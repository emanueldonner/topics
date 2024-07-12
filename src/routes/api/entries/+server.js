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
	const { id, topic, type, url, title, description, user_note, author, image } =
		await request.json();
	console.log('all data', topic, type, url, title, description, user_note, author, image);
	try {
		let { data: topicData, error: topicError } = await supabase
			.from('topics')
			.select('*')
			.eq('name', topic.name)
			.single();

		if (topicError && topicError.code === 'PGRST116') {
			const { data: newTopicData, error: newTopicError } = await supabase
				.from('topics')
				.insert({ name: topic.name, color: topic.color, user_id: user.id })
				.single();

			if (newTopicError) {
				console.error('POST Insert Topic Error:', newTopicError);
				return new Response(JSON.stringify({ message: newTopicError.message }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			topicData = newTopicData;
		} else if (topicError) {
			console.error('POST Select Topic Error:', topicError);
			return new Response(JSON.stringify({ message: topicError.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const { data, error } = await supabase
			.from('entries')
			.upsert({
				id: id || undefined,
				user_id: user.id,
				type,
				url,
				title,
				description,
				user_note,
				author,
				image,
				topic_id: topicData?.id || newTopicData?.id,
				topic_name: topic.name
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
