<script>
	import { data, activePage } from './stores/global.js'
	import dataSource from './data/data.json'
	import TitleCard from './lib/svg/TitleCard.svelte';
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import TitleSvg from './lib/svg/TitleSvg.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';

	/* const initialFilter = [
		{
			id: "year",
			value: [1998, 1999, 2000, 2001]
		},
	] */

	let globeTop, globeLeft, globeOpacity;
	let ready = false;

	function filterData(filterObj) {
		const currentData = dataSource;
		if (filterObj == undefined || filterObj[0].value.length == 0) {
			$data = dataSource;
		} else {
			const filtered = currentData.filter(item => {
				return filterObj.every(filter => {
					return filter.value.includes(item[filter.id])
				})
			})
			$data = filtered;
			console.log("new data", $data);
		}
	}



	onMount(async () => {
        filterData();
		ready = true;
		/* const elem = document.querySelector(".box-svg")
		const position = elem == null ? null : elem.getBoundingClientRect();
		percentTop = elem == null ? 0 : position.top/Window.height() * 100;
		percentLeft = elem == null ? 0 : position.left/Window.width() * 100;
		globeTop = percentTop;
		globeLeft = percentLeft; */
	});

	// style="top: {globeTop}%; left: {globeLeft}%;"
	

</script>

<main>
	{#if ready == true}
		{#if $activePage == "intro"}
			<div class='intro' in:fade={{ delay: 500 }}>
				<div class='title-section'>
					<div class='globe-wrapper' in:fade={{ delay: 1200 }}>
						<Globe />
					</div>
					<TitleCard />
					<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
				</div>
				<div class='text-section' in:fade={{ delay: 500 }}>
					<div class='intro-text'>
						<h2 class='sr-only'>Introduction</h2>
						<p>Venus, the morning star, Earth's twin, has been inspiring humanity for thousands of years.</p>
						<br>
						<p>Beneath its swirling superhot atmosphere, nearly every discovered surface feature — every mountain, valley, and crater — has been named after a woman.</p>
						<br>
						<p>Carved into Venus's alien landscape are stories of pioneering explorers, war godesses, mythical heroines, and more. This project aims to tell their stories.</p>
					</div>
					<div class='intro-button'>
						<button>Explore the names</button>
					</div>
				</div>
			</div>
		{/if}
	{/if}

	{#if $activePage == "main"}
		<div class='content'>
			<div class='header'>
				<TitleSvg borderColor="black" textColor="white" starColor="#c97889" />
			</div>
			<div class="card-wrapper">
				{#each $data as feature}
				<Card cardData={feature} />
				{/each}
			</div>
		</div>
	{/if}
	
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
		color: var(--card-bg-color);
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

	.card-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr) );
  		column-gap: 12px;
  		row-gap: 12px;
		height: 80vh;
		overflow: auto;
	}

	.intro-button {
		margin: 10% auto auto auto;
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