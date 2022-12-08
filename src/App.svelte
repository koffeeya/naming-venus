<script>
	import { data } from './stores/global.js'
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import Radar from './lib/chart/Radar.svelte';
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
			<Radar />
			<div>a more, longer description of this</div>
		</div>
		<div class="card-wrapper">
			{#each $data as feature}
			  <Card data={feature} />
			{/each}
		  </div>
	</div>
</main>

<style lang="scss">
	\:global {
		@import "scss/style.scss";
	}

	main {
		max-width: 80%;
		margin: auto;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		column-gap: 24px;
	}

	.globe-wrapper {
		border-radius: 500px;
		border: 2px solid white;
		margin: auto;
		max-width: 300px;
		max-height: 300px;
	}

	.card-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(275px, 1fr) );
  		column-gap: 24px;
  		row-gap: 24px;
		height: 80vh;
		overflow: scroll;
	}

	
	/* @media (min-width: 640px) {
		.content {
			display: grid;
			grid-template-columns: 1fr;
		}
	} */
</style>