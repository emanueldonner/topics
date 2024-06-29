<script>
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let entry;

	const dispatch = createEventDispatcher();

	dispatch('editEntry', entry);
</script>

<div class="edit-overlay">
	<button on:click={() => dispatch('editEntry', entry)}>
		<Icon icon="lucide:more-horizontal" />
	</button>
</div>

<style>
	.edit-overlay button {
		padding: 0.5rem;
		border: none;
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
	}
</style>
