<script>
	// stores
	import { data, activePage, resetData, page, globe, filterObj, defaultFilters } from './stores/global.js'

	// components
	import TitleCard from './lib/svg/TitleCard.svelte';
	import Globe from "./lib/globe/Globe.svelte";
	import Card from './lib/card/Card.svelte';
	import Filter from './lib/elements/Filter.svelte';
	import PageNavigation from './lib/elements/PageNavigation.svelte';

	// svelte libraries
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
  	
	// utils
	import { showGlobePoints, clearGlobePoints, filterData } from './js/utils.js';
	import dataSource from "./data/data.json";

	// Waits for page load to add svelte transitions
	let ready = false;

	// Add "hide" class to page that is not active
	$: introStatus = $activePage == "intro" ? "" : "hide";
	$: contentStatus = $activePage == "main" ? "" : "hide";

	// How many cards to show on a single page
	let visibleData, idArray;
	$: cardsPerPage = 6;
	// Only show active cards
	$: {
		// Get the indices of the first and last cards to show
		const minIndex = ($page * cardsPerPage) + 0;
		const maxIndex = ($page * cardsPerPage) + (cardsPerPage - 1);
		const filtered = $data.filter((value, index) => {
			if (index >= minIndex && index <= maxIndex) {
				return value;
			}
		});
		// Get IDs of visible cards, to show them on the globe too
		idArray = $activePage == "intro" ? null : filtered.map(v => v.feature_id);
		$globe == undefined ? null : showGlobePoints(idArray, $globe);
		// Update the cards visible on the page
		visibleData = filtered;
	}

	$: globeMargin = $activePage == "intro" ? "148px 55px" : "0% 0%";

	// Change the active page
	function handlePageChange(newPage) {
		const introSection = document.querySelector(`.intro-mode`);
		const mainSection = document.querySelector(`.main-mode`);

		if (newPage == "intro") {
			clearGlobePoints($globe);
			mainSection.style.opacity = 0;
			introSection.style.opacity = 1;
		} else {
			//showGlobePoints(idArray, $globe);
			mainSection.style.opacity = 1;
			introSection.style.opacity = 0;
		}

		activePage.set(newPage);
	}

	/* 
	Streamline the active page thing - intro vs. content is killing me
	Add real filters
	!TODO change the filtering method to apply to everything - active status isn't working :(
	Search bar
	Bar charts
	Modal
	Mobile responsiveness
	Accessibility - check tabbing order
	*/
	onMount(async () => {
		resetData();
		ready = true;
	})
</script>

<main>
{#if ready == true}
	<!-- INTRO PAGE -->
	<div class='intro-mode {introStatus}'>
		<!-- Title card -->
		<div class='title-section'>
			<div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" in:fade="{{duration: 500, delay: 2000}}">
				<Globe targetNode="intro-globe" />
			</div>
			<div class='title-card-wrapper' aria-hidden="true" focusable="false" in:fade="{{duration: 500}}">
				<TitleCard width={350} height={600} />
			</div>
		</div>

		<!-- Intro text -->
		<div class='intro-text'>
			<!-- Text -->
			<div in:fade="{{duration: 500, delay: 500}}">
				<h2 class='sr-only'>Introduction</h2>
				<p>Venus, the morning star, Earth's twin, has been inspiring humanity for thousands of years. Beneath its swirling superhot atmosphere, nearly every discovered surface feature — every mountain, valley, and crater — has been named after a woman.</p>
				<br>
				<p>Carved into Venus's alien landscape are stories of pioneering explorers, war godesses, mythical heroines, and more. This project aims to tell their stories.</p>
			</div>
			<!-- Call to action -->
			<div in:fade="{{duration: 500, delay: 1000}}">
				<button id='intro-button' on:click={e => handlePageChange("main")} on:keypress={e => handlePageChange("main")}>Explore the names</button>
			</div>
		</div>	

	</div>

	<!-- CARDS PAGE -->
	<div class='main-mode {contentStatus}'>
		<!-- Top header -->
		<div class='header'>
			<!-- Logo button -->
			<div>
				<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
				<button aria-expanded="false" id='title-button' on:click={e => handlePageChange("intro")} on:keypress={e => handlePageChange("intro")} >Naming Venus</button>
			</div>
			<!-- Page navigation -->
			<div class='page-buttons-wrapper {contentStatus}'>
				<PageNavigation {cardsPerPage} />
			</div>
		</div>

		<!-- Content -->
		<div class='content-grid'>
			<!-- Globe and filters sidebar -->
			<div class='sidebar'>
				<!-- Globe for intro -->
				<div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" >
					<Globe targetNode="cards-globe" />
				</div>
				<!-- Filters -->
				<div class='filter-section'>
					<div class='globe-spacer'></div>
					<div>
						<h3>Showing {$data.length} {$data.length == 1 ? "feature" : "features"}</h3>
					</div>

					{#if $data.length == dataSource.length}
						<div>
							<button class='reset-button' on:click={e => filterData($filterObj, defaultFilters["type"], "type", $data, false)} on:keypress={e => filterData($filterObj, defaultFilters["type"], "type", $data, false)}>Hide all</button>
						</div>
					{:else}
						<div>
							<button class='reset-button' on:click={e => resetData()} on:keypress={e => resetData()}>Show all</button>
						</div>
					{/if}
					
					<div>
						{#each Object.keys($filterObj) as variable}
							<Filter {variable} />
						{/each}
					</div>
				</div>
			</div>

			<!-- Card section -->
			<div class="card-wrapper">
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
		max-width: 80vw;
	}

	.intro-mode {
		margin: auto;
		max-width: 45%;
		height: 90vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		opacity: 1;
        transition: 0.4s ease all;
	}

	.main-mode {
		margin: auto;
		opacity: 0;
        transition: 0.4s ease all;
		width: fit-content;
		height: fit-content;
	}

	.content-grid {
		margin: auto;
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	.header {
		position: sticky;
		top: 0;
		background-color: black;
		z-index: 200;
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	.intro-text {
		margin: auto auto auto 10%;
		min-width: 200px;
		color: white;
	}

	.intro-text>p {
		font-size: 16px;
		padding: 2% auto 10% auto;
	}

	.title-section {
		margin: auto;
		width: fit-content;
		height: fit-content;
	}

	.feature-count {
		margin: 1% 2%;
	}

	.globe-wrapper {
		z-index: 100;
		position: absolute;
		max-width: 300px;
		max-height: 300px;
		overflow: hidden;
		transition: opacity 2s;
	}

	.globe-spacer {
		margin: 275px 0px 0px 0px;
	}

  	.card-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
  		column-gap: 0px;
  		row-gap: 0px;
		height: fit-content;
		margin: auto;
	}

	.page-buttons-wrapper {
		width: fit-content;
		margin: auto;
	}

	.reset-button {
		padding: 5px;
	}

	#intro-button {
		display: inline-block;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		margin: 3% 0%;
		text-decoration: none;
		background: #ffffffaa;
		color: var(--card-bg-color);
		font-family: var(--tragic-grotesk);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
		transform: scale(0.98);
        transition: 0.1s ease-in-out all;
		opacity: 90%;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	#intro-button:hover {
		cursor: pointer;
        opacity: 100%;
        transform: scale(1);
        transition: 0.1s ease all;
	}

	#title-button {
		background-color: transparent;
		margin: 0px;
		padding: 0px;
		border: none;
		width: fit-content;
		height: fit-content;
		font-family: var(--boecklins);
		font-size: 36px;
		white-space: nowrap;
		color: white;
		transform: scale(0.98);
        transition: 0.1s ease-in-out all;
		opacity: 90%;
	}

	#title-button:hover {
		cursor: pointer;
        opacity: 100%;
        transform: scale(1);
        transition: 0.1s ease all;
	}

	@media only screen and (max-width: 1200px) {
		main {
			max-width: 90vw;
		}

		.card-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	@media only screen and (max-width: 1000px) {
		main {
			max-width: 90vw;
		}

		.main-mode {
			grid-template-columns: 1fr;
		}

		.card-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	@media only screen and (max-width: 600px) {
		main {
			max-width: 95vw;
		}

		.main-mode {
			grid-template-columns: 1fr;
		}

		.card-wrapper {
			display: grid;
			grid-template-columns: 1fr;
		}
	}

</style>