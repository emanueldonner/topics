<script>
</script>

<div class="main-container">
	<slot />
	<!-- <div class="menu-container">
		<MenuBar />
	</div> -->
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		/* height: 100vh; */
		width: 100vw;
		justify-content: flex-start;
		/* align-items: center; */
		/* background-color: #eae8f0; */
		padding-bottom: 4rem;
		background-color: #f0f3f5;
		height: 100vh;
	}
</style>
