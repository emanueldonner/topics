<script>
	import CardAvatar from './CardAvatar.svelte';

	export let userNote;

	const shortVersion = (text) => {
		if (text.length > 500) {
			return text.slice(0, 500) + '...';
		}
		return text;
	};
</script>

<div class="user-note">
	<div class="note-avatar">
		<CardAvatar size="small" />
	</div>
	<div class="note-text">
		{shortVersion(userNote)}
	</div>
</div>

<style>
	.user-note {
		font-size: 0.8rem;
		background-color: rgba(0, 0, 0, 0.03);
		padding: 0.5rem;
		border-radius: 1rem;
		color: #666;
		display: flex;
		align-items: flex-start;
	}

	.note-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
