<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import { Grid } from '@splidejs/splide-extension-grid';
    import { activePage, data, page, globe } from "../../stores/global";
    import { showGlobePoints } from "../../js/utils";
    import { fade } from "svelte/transition";
    import Card from "../card/Card.svelte";
    import "@splidejs/splide/dist/css/splide.min.css";

    export let cardsPerPage;

    // How many cards to show on a single page
	let visibleData, idArray;
	
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

    const options = {
        autoWidth: true,
        perPage: 9,
        grid: {
            rows: 2,
            cols: 2,
            gap : {
                row: '1rem',
                col: '1.5rem',
            },
        },
    }
</script>

<!-- 
{#key $data}
                {#key $page}
                    {#each visibleData as feature}
                        <div in:fade={{ delay: 50 }}>
                            <Card cardData={feature} />
                        </div>
                    {/each}
                {/key}
            {/key}
 -->

 <!-- extensions= {{Grid}} -->
<div class='cards'>
    {#key $data}
        <section class='card-carousel'>
            <Splide {options} extensions= {{Grid}} aria-label="Feature Cards">
                <div class='splide-grid'>
                    {#each $data as feature}
                        <SplideSlide>
                            <div>
                                {feature}
                            </div>
                        </SplideSlide>
                    {/each}
                </div>
            </Splide>
        </section>
    {/key}
</div>


<style lang="scss">
    .splide-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 1200px) {
        .intro {
            max-width: 100vw;
        }
    }


    @media (max-width: 700px) {
        .intro {
            max-width: 100vw;
        }
    }
</style>