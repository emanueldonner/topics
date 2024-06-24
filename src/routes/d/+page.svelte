<script>
	import Icon from '@iconify/svelte';
</script>

<h2>Topics</h2>

<div class="container">
	<button class="add-topic-button" on:click={() => console.log('add topic')}>
		<Icon icon="mdi:plus" />
	</button>
</div>
