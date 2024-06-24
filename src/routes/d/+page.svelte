<script>
	import Icon from '@iconify/svelte';
	import { add } from 'cheerio/lib/api/traversing';
</script>

<h2>Topics</h2>

<div class="container">
	<button class="add-topic-button" on:click={() => add}>
		<Icon icon="mdi:plus" />
	</button>
</div>
