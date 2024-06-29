<script>
	import Icon from '@iconify/svelte';
</script>

<div class="edit-overlay">
	<Icon icon="lucide:more-horizontal" />
</div>

<style>
	.edit-overlay {
		padding: 0.5rem;
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
	}
</style>
