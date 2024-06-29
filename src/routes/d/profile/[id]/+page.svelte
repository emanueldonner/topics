<script>
	export let data;
	const { user } = data;
	console.log('data', user);
</script>

<h2>Profile</h2>
<div class="container">
	<p>{user.id}</p>
	<p>{user.name}</p>
	<p>{user.email}</p>
</div>

<style></style>
