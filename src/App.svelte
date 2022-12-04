<script>
	import Globe from "./lib/globe/Globe.svelte";
	import { onMount } from 'svelte';	
</script>

<main>
	<div class='header'>
		<h1>Naming Venus</h1>
	</div>
	<div class='content'>
		<div class ='column'>
			<div class='globe-wrapper'>
				<Globe />
			</div>
			<div>right side</div>
		</div>
		<div>right side</div>
	</div>
</main>

<style lang="scss">
	\:global {
		@import "scss/style.scss";
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	.globe-wrapper {
		border-radius: 500px;
		border: 2px solid white;
	}

	
	/* @media (min-width: 640px) {
		.content {
			display: grid;
			grid-template-columns: 1fr;
		}
	} */
</style>