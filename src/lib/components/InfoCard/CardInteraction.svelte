<script>
	import Icon from '@iconify/svelte';

	export let entry;
</script>

<div class="container">
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
	<div class="topic-container">
		{#if entry.topic_name}
			<div class="topic-name">
				<Icon icon="lucide:hash" />
				{entry.topic_name}
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.8rem;
		/* padding: 0.5rem 0.5rem 0; */
	}
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

	.topic-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.5rem;
	}

	.topic-name {
		font-size: 0.8rem;
		color: #e7bd55;
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: rgba(243, 184, 44, 0.03);
		border: 1px solid rgba(243, 184, 44, 0.2);
		border-radius: 0.5rem;
		padding: 0.2rem 0.5rem;
	}
</style>
