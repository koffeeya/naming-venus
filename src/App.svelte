<script>
	import { data, activePage, setActivePage, filterData, resetData } from './stores/global.js'
	import TitleCard from './lib/svg/TitleCard.svelte';
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import TitleSvg from './lib/svg/TitleSvg.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const testFilter = [
		{
			id: "year",
			value: [1998, 1999, 2000, 2001]
		},
		{
			id: "type",
			value: ["Goddess"]
		}
	]

	let ready = false;

	onMount(async () => {
		ready = true;
	});

	$: introStatus = $activePage == "intro" ? "" : "hide";
	$: contentStatus = $activePage == "main" ? "" : "hide";
</script>

<main>
	<!-- INTRO SECTION -->
	<div class='intro {introStatus}' in:fade={{ delay: 500 }} out:fade={{ delay: 500 }}>
		<div class='title-section'>
			<div class='globe-wrapper' in:fade={{ delay: 1200 }} out:fade={{ delay: 500 }} aria-hidden="true" focusable="false">
				<Globe />
			</div>
			<TitleCard width={350} height={600} />
			<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
		</div>
		<div class='text-section' in:fade={{ delay: 500 }} out:fade={{ delay: 500 }}>
			<div class='intro-text'>
				<h2 class='sr-only'>Introduction</h2>
				<p>Venus, the morning star, Earth's twin, has been inspiring humanity for thousands of years.</p>
				<br>
				<p>Beneath its swirling superhot atmosphere, nearly every discovered surface feature — every mountain, valley, and crater — has been named after a woman.</p>
				<br>
				<p>Carved into Venus's alien landscape are stories of pioneering explorers, war godesses, mythical heroines, and more. This project aims to tell their stories.</p>
			</div>
			<div on:click={e => setActivePage("main")} on:keypress={e => setActivePage("main")}>
				<button id='intro-button'>Explore the names</button>
			</div>
			<div class='filter-button' on:click={e => filterData(testFilter)} on:keypress={e => filterData(testFilter)}>
				<button>Test filter</button>
			</div>
			<div class='reset-button' on:click={e => resetData(testFilter)} on:keypress={e => resetData(testFilter)}>
				<button>Reset filter</button>
			</div>
		</div>
	</div>

	<!-- CONTENT SECTION -->
	<div class='content {contentStatus}'>
		<div class='header'>
			<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
			<button aria-expanded="false" id='title-button' on:click={e => setActivePage("intro")} on:keypress={e => setActivePage("intro")} in:fade={{ delay: 2500 }} out:fade={{ delay: 2500 }}>
				<TitleSvg borderColor="black" textColor="white" starColor="#c97889" aria-hidden="true" focusable="false" />
			</button>
		</div>
		<div class="card-wrapper">
			{#each $data as feature}
			<div in:fade={{ delay: 2500 }}>
				<Card cardData={feature} />
			</div>
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

	.header {
		text-align: center;
		width: 100%;
	}

	.intro {
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 24px;
		max-width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 98vh;
	}

	.intro-text {
		margin: auto;
		min-width: 200px;
		font-size: 25px;
		color: white;
	}

	.title-section, .chart-section {
		margin: auto;
		width: fit-content;
	}

	.globe-wrapper {
		z-index: 100;
		margin: 130px 36px;
		position: absolute;
	}

	/* .card-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr) );
  		column-gap: 12px;
  		row-gap: 12px;
		height: 80vh;
		overflow: auto;
	} */

	/*   display: flex;
  flex-flow: row wrap;
  margin: 15px 3px; */


  .card-wrapper {
		display: flex;
		flex-flow: row wrap;
		margin: 15px 3px;
		height: 80vh;
		overflow: auto;
	}

	#intro-button {
		display: inline-block;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		margin: 0;
		text-decoration: none;
		background: #ffffffaa;
		color: var(--card-bg-color);
		font-family: var(--tragic-grotesk);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
		transition: background 250ms ease-in-out, transform 150ms ease;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	#title-button {
		background-color: transparent;
		margin: 0px;
		padding: 0px;
		border: none;
	}

	@media only screen 
	and (min-device-width: 320px) 
	and (max-device-width: 480px)
	and (-webkit-min-device-pixel-ratio: 2) {
		.intro {
			display: grid;
			grid-template-columns: 1fr;
			max-width: 100%;
			height: 98vh;
		}

	}

</style>