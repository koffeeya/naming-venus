<script>
    import { activePage, globe } from "../../stores/global";
    import { handlePageChange } from "../../js/utils";
</script>

<div class='intro'>
    <h2 class='sr-only'>Introduction</h2>
    <div class='text-grid'>
        <!-- Text -->
        <div class='intro-text section-1'>
            <p class='intro-paragraph'>Venus — Earth's twin, the Morning Star — has captured our collective imagination for more than 5,000 years. But until about 50 years ago, no one knew what its surface looked like.</p>

            <p class='intro-paragraph'>The invention of the radar telescope in the 1960s was a breakthrough. For the first time, astronomers could peer through swirling acid clouds and see craters, valleys and mountains. There was an unprecedented explosion of discovery. And the features they saw, they named.</p>
            
            <p class='intro-paragraph'>Nearly all of the features on Venus are named after women: goddesses, heroines, famous women, and female first names. But not everyone on Earth can look at Venus and see themselves reflected back: nearly 40% of those names are European in origin.</p>

            <p class='intro-paragraph'>Why do we name features on other worlds? Giving something a name makes it easier to talk about, of course. But the act of naming goes deeper: it is an expression of culture and ownership. An alien landscape feels more human, more ours, when we call it names from home. And like any colonial endeavor, it is subject to the bias of those in power.</p>
        </div>

        <!-- Section 2: Naming -->
        <div class='intro-text section-2'>

            <!-- Call to action -->
            <div>
                <button id='intro-button' on:click={e => handlePageChange($activePage, $globe)} on:keypress={e => handlePageChange($activePage, $globe)}>Explore the names</button>
            </div>
        </div>
    </div>

    
</div>

<style lang="scss">
    .intro-text {
		margin: 3% auto auto 10%;
		color: white;
	}

    .text-grid {
        display: grid;
        grid-template-columns: 1fr;
    }

    .credit-line {
        text-align: center;
        margin: 2%;
        font-size: 1.2rem;
    }

    .intro-paragraph {
        display: inline-block;
        margin: 0rem 0rem 1.15rem 0rem;
        font-family: var(--gentium);
        line-height: 1.5rem;
        font-size: 1.2rem;
    }

    .intro-subhed {
        display: inline-block;
        font-size: 1.5rem;
        font-family: var(--tragic-grotesk);
        margin: 1.2rem 0rem 1rem 0rem;
        line-height: 1.7rem;
        color: var(--famous-woman-color);
    }

    .quote {
        display: inline-block;
        margin: auto;
        padding: 0rem 1rem;
        font-family: var(--tragic-grotesk);
        line-height: 1.3rem;
        border-left: 2px solid var(--famous-woman-color);
        max-width: 80%;
    }

    #intro-button {
		display: inline-block;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		margin: 3% 0%;
		text-decoration: none;
		background: var(--famous-woman-color);
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
</style>