<script>
	import { data } from './stores/global.js'
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import Radar from './lib/chart/Radar.svelte';
</script>

<main>
	<div class='header'>
		<h1>Naming Venus</h1>
		<div class='intro'>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
		</div>
	</div>
	
	<div class='content'>
		<div class ='column'>
			<div class='globe-wrapper'>
				<Globe />
			</div>
			<Radar category={"type"} />
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

	:root {
  font-family: "TragicGrotesk", sans-serif;
  background-color: #030303;
  font-size: 16px;
  color: white;

  /* Fonts */
  --tragic-grotesk: "TragicGrotesk", sans-serif;
  --boecklins: "Boecklins Universe", sans-serif;

  /* Type colors */
  --goddess-color: #d7a954;
  --heroine-color: #8ab67b;
  --first-name-color: #6cb4cc;
  --famous-woman-color: #c97889;
  --other-color: #9b9b9b;

  /* Font colors */
  --font-gray: #757575;
  --card-bg-color: #181818;

  /* Fonts */
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

h1 {
  font-size: 3.2rem;
  line-height: 1.1;
  margin: 0px;
  padding: 0px;
}

h3 {
  font-size: 2.2em;
  margin: 0px;
  padding: 0px;
}

p {
  margin: 0px;
  padding: 0px;
  font-size: 1rem;
}


	main {
		max-width: 80%;
		margin: auto;
	}

	.header {
		margin: 1% 0% 5% 0%;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		column-gap: 10%;
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
  		column-gap: 15px;
  		row-gap: 15px;
		height: 75vh;
		overflow: scroll;
	}

	
	/* @media (min-width: 640px) {
		.content {
			display: grid;
			grid-template-columns: 1fr;
		}
	} */
</style>