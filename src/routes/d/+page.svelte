<script>
	import Icon from '@iconify/svelte';
</script>

<div class="container">
	<h2>Topics</h2>

	<div class="container">
		<button class="add-topic-button" on:click={() => console.log('add topic')}>
			<Icon icon="mdi:plus" />
		</button>
	</div>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		min-height: 30rem;
	}
	.add-topic-button {
		width: 60px;
		height: 60px;
		padding: 0;
		border: none;
		font-size: 2.4rem;
		line-height: 1;
		color: #4d4d4d;
		border: 3px solid #4d4d4d;
		border-radius: 50%;
		background-color: transparent;
		/* box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.09); */
		cursor: pointer;
		transform: scale(0.95);
		transition: all 0.2s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.add-topic-button:hover {
		background-color: #aaccff33;
		transform: scale(1);
	}
</style>
