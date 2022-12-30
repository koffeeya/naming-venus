<script>
	// stores
	import { data, activePage, filterData, resetData, page, globe } from './stores/global.js'

	// components
	import TitleCard from './lib/svg/TitleCard.svelte';
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import TitleSvg from './lib/svg/TitleSvg.svelte';
	import FilterGroup from './lib/elements/FilterGroup.svelte';

	// svelte libraries
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut} from 'svelte/easing';
	import { tweened } from 'svelte/motion';
  	
	// utils
	import { showGlobePoints, clearGlobePoints } from './js/utils.js';
  	import PageNavigation from './lib/elements/PageNavigation.svelte';
	
	const testFilter = [
		{
			id: "type",
			value: ["Famous Woman", "Goddess", "Heroine", "First Name", "Other"]
		},
		{
			id: "feature",
			value: ["Crater", "Tholus", "Vallis", "Planitia"]
		},
		{
			id: "origin",
			value: ["Japan", "United States"]
		}
	]

	let ready = false;

	onMount(async () => {
		filterData();
		ready = true;
	});

	$: introStatus = $activePage == "intro" ? "" : "hide";
	$: contentStatus = $activePage == "main" ? "" : "hide";
	$: globeMargin = $activePage == "intro" ? "-475px 40px" : "0px 0px";
	$: cardsPerPage = 6;
	let visibleData, idArray;
	$: {
		const minIndex = ($page * cardsPerPage) + 0;
		const maxIndex = ($page * cardsPerPage) + (cardsPerPage - 1);
		const filtered = $data.filter((value, index) => {
			if (index <= maxIndex && index >= minIndex) {
				return value;
			}
		});

		idArray = $activePage == "intro" ? null : filtered.map(v => v.feature_id);
		$globe == undefined ? null : showGlobePoints(idArray, $globe);
		visibleData = filtered;
	}

	function handlePageChange(newPage) {
		if (newPage == "intro") {
			clearGlobePoints($globe);
		} else {
			showGlobePoints(idArray, $globe)
		}
		
		activePage.set(newPage);
	}

	/* 
	Streamline the active page thing - intro vs. content is killing me
	Add real filters
	Search bar
	Bar charts
	Modal
	Mobile responsiveness
	*/

</script>

<main>
{#if ready == true}
	<div class='header {contentStatus}' in:fade={{ delay: 500 }}>
		<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
		<button aria-expanded="false" id='title-button' on:click={e => handlePageChange("intro")} on:keypress={e => handlePageChange("intro")} >
			<TitleSvg borderColor="black" textColor="white" />
		</button>

		<div class='page-buttons-wrapper {contentStatus}'>
			<PageNavigation {cardsPerPage} />
		</div>
	</div>

	<div class='content {$activePage}-mode' in:fade={{ delay: 500 }}>
		<div class='left-content'>
			<div>
				<div class='{introStatus}' aria-hidden="true" focusable="false">
					<TitleCard width={350} height={600} />
				</div>
				<div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" in:fade={{ delay: 600 }} >
					<Globe />
				</div>
			</div>
			<div class='{contentStatus}'>
				<div class='globe-spacer'></div>
				<div>
					<button class='filter-button' on:click={e => filterData(testFilter)} on:keypress={e => filterData(testFilter)}>Test filter</button>
					<button class='reset-button' on:click={e => resetData(testFilter)} on:keypress={e => resetData(testFilter)}>Reset filter</button>
				</div>
				<div>
					<FilterGroup />
				</div>
			</div>
		</div>

		<div class='right-content'>
			<div>
				<div class='intro-text {introStatus}'>
					<h2 class='sr-only'>Introduction</h2>
					<p>Venus, the morning star, Earth's twin, has been inspiring humanity for thousands of years. Beneath its swirling superhot atmosphere, nearly every discovered surface feature — every mountain, valley, and crater — has been named after a woman. Carved into Venus's alien landscape are stories of pioneering explorers, war godesses, mythical heroines, and more. This project aims to tell their stories.</p>

					<div>
						<button id='intro-button' on:click={e => handlePageChange("main")} on:keypress={e => handlePageChange("main")}>Explore the names</button>
					</div>
				</div>
			</div>

			<div class="card-wrapper {contentStatus}" >
				{#key $data}
					{#key $page}
						{#each visibleData as feature}
							<div in:fade={{ delay: 50 }}>
								<Card cardData={feature} />
							</div>
						{/each}
					{/key}
				{/key}
			</div>
		</div>
	</div>
{/if}
</main>

<style lang="scss">
	\:global {
		@import "scss/style.scss";
	}

	main {
		margin: auto;
	}

	.header {
		text-align: center;
		width: 100%;
	}

	.intro-mode {
		margin: auto;
		max-width: 35%;
		height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.main-mode {
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 3fr;
		column-gap: 24px;
		max-width: 90%;
	}

	.intro-text {
		margin: auto auto auto 10%;
		min-width: 200px;
		color: white;
	}

	.intro-text>p {
		font-size: 16px;
		padding: auto auto 10% auto;
	}

	.title-section, .chart-section {
		margin: auto;
	}

	.globe-spacer {
		height: 300px;
	}

	.feature-count {
		margin: 1% 2%;
	}

	/* margin: 130px 36px; */
	.globe-wrapper {
		z-index: 100;
		position: absolute;
		max-width: 300px;
		max-height: 300px;
		overflow: hidden;
		transition: opacity 2s;
	}

  	.card-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
  		column-gap: 8px;
  		row-gap: 8px;
		height: 80vh;
		overflow: auto;
	}

	.page-buttons-wrapper {
		width: fit-content;
		margin: auto;
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
		.card-wrapper {
			display: grid;
			grid-template-columns: 1fr;
			max-width: 100%;
			height: 98vh;
		}

	}

</style>