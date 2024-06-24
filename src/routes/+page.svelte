<script>
	export let data;
	$: ({ topics } = data);
</script>

<h1>Welcome to Supabase!</h1>
<ul>
	{#each topics as topic}
		<li>{topic.name}</li>
	{/each}
</ul>