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
	import { afterUpdate, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
  	
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

	$: introStatus = $activePage == "intro" ? "" : "hide";
	$: contentStatus = $activePage == "main" ? "" : "hide";
	// $: globeMargin = $activePage == "intro" ? "-32.5% 5.2%" : "0% 0%";
	$: globeMargin = $activePage == "intro" ? "148px 55px" : "0% 0%";
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
		const introSection = document.querySelector(`.intro-mode`);
		const mainSection = document.querySelector(`.main-mode`);

		if (newPage == "intro") {
			clearGlobePoints($globe);
			mainSection.style.opacity = 0;
			introSection.style.opacity = 1;
		} else {
			showGlobePoints(idArray, $globe);
			mainSection.style.opacity = 1;
			introSection.style.opacity = 0;
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

	onMount(async () => {
		filterData();
		ready = true;
	})
</script>

<main>
{#if ready == true}
	<!-- Intro page in:fade={{ duration: 600 }}-->
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

	<!-- Card page -->
	<div class='main-mode {contentStatus}'>
		<!-- Header section -->
		<div class='header'>
			<!-- Title -->
			<div>
				<h1 class='sr-only'>Naming Venus: a data visualization project by Kavya Beheraj</h1>
				<button aria-expanded="false" id='title-button' on:click={e => handlePageChange("intro")} on:keypress={e => handlePageChange("intro")} >
					<TitleSvg borderColor="black" textColor="white" />
				</button>
				
			</div>
			<!-- Globe for intro -->
			<div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" >
				<Globe targetNode="cards-globe" />
			</div>
			<!-- Filters -->
			<div class='filter-section'>
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

		<!-- Card section -->
		<div>
			<!-- Page navigation -->
			<div class='page-buttons-wrapper {contentStatus}'>
				<PageNavigation {cardsPerPage} />
			</div>
			<!-- Cards -->
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
		display: grid;
		grid-template-columns: 1fr 3fr;
		opacity: 0;
        transition: 0.4s ease all;
		width: fit-content;
		height: fit-content;
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
		width: fit-content;
		margin: auto;
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
		width: fit-content;
		height: fit-content;
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