<script>
	import Icon from '@iconify/svelte';
	export let type;
</script>

<div class="card-type">
	{#if type.includes('article')}
		<Icon icon="lucide:newspaper" />
	{:else if type.includes('book')}
		<Icon icon="lucide:book-text" />
	{:else if type.includes('video')}
		<Icon icon="lucide:video" />
	{:else if type.includes('tvshow')}
		<Icon icon="lucide:tv" />
	{:else if type.includes('movie')}
		<Icon icon="lucide:film" />
	{:else if type.includes('music')}
		<Icon icon="lucide:music-4" />
	{:else if type.includes('podcast')}
		<Icon icon="lucide:podcast" />
	{:else if type.includes('profile')}
		<Icon icon="lucide:square-user-round" />
	{:else}
		<Icon icon="mdi:help-circle-outline" />
	{/if}
</div>

<style>
	.card-type {
		font-size: 1rem;
		padding: 0.3rem 0.5rem;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		width: 2rem;
		height: 2rem;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
