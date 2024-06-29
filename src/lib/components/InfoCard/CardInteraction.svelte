<script>
	import Icon from '@iconify/svelte';

	export let entry;
</script>

<div class="interaction-container">
	<button class="like-button">
		<Icon icon="lucide:heart" />
	</button>
	<button class="comment-button">
		<Icon icon="lucide:message-square" />
	</button>
	<button class="share-button">
		<Icon icon="lucide:share-2" />
	</button>
</div>

<style>
	.interaction-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.8rem;
		padding: 0.5rem 0.5rem 0;
	}

	button {
		background: none;
		border: none;
		padding: 0;
		color: #333;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
