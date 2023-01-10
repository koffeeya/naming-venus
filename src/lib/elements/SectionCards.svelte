<script>
    import { activePage, data, page, globe, cardsPerPage, visibleData } from "../../stores/global";
    import { showGlobePoints } from "../../js/utils";
    import { fade } from "svelte/transition";
    import Card from "../card/Card.svelte";

    // Show these points on the globe
    let idArray;
	
	// Only show active cards
	$: {
		// Get the indices of the first and last cards to show
		const minIndex = ($page * $cardsPerPage) + 0;
		const maxIndex = ($page * $cardsPerPage) + ($cardsPerPage - 1);
		const filtered = $data.filter((value, index) => {
			if (index >= minIndex && index <= maxIndex) {
				return value;
			}
		});
		// Get IDs of visible cards, to show them on the globe too
		idArray = $activePage == "intro" ? null : filtered.map(v => v.feature_id);
		$globe == undefined ? null : showGlobePoints(idArray, $globe);
		// Update the cards visible on the page
		$visibleData = filtered;
	}
</script>

<div class='cards'>
    {#key $data}
        {#key $page}
            {#each $visibleData as feature, index}
                <div in:fade={{ delay: 50 }}>
                    <Card cardData={feature} cardIndex={index} />
                </div>
            {/each}
        {/key}
    {/key}
</div>


<style lang="scss">
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 0px auto auto auto;
    }

    @media (max-width: 1200px) {
        .cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }


    @media (max-width: 750px) {
        .cards {
            display: grid;
            grid-template-columns: 1fr;
        }
    }
</style>