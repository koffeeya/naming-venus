<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import { activePage, globe } from "../../stores/global";
    import { handlePageChange } from "../../js/utils";
    import IntroTextCard from "./IntroTextCard.svelte";
    import Globe from "../globe/Globe.svelte";
    import TitleCard from "../svg/TitleCard.svelte";
    import { fade } from "svelte/transition";
    import "@splidejs/splide/dist/css/splide.min.css";

    $: globeMargin = $activePage == "intro" ? "134px 40px" : "0% 0%";

    const options = {
        padding: '5rem',
        focus  : 'center',
        autoWidth: true,
    }
</script>

<div class='intro'>
    <h2 class='sr-only'>Introduction</h2>

    <section class='carousel'>
        <Splide {options} aria-label="Introduction">
            <!-- in:fade="{{duration: 500}}" -->
            <SplideSlide>
                <div class='intro-card' id="card-1">
                    <div class='globe-wrapper' style='margin: {globeMargin};' aria-hidden="true" focusable="false" in:fade="{{duration: 500, delay: 2000}}">
                        <Globe targetNode="intro-globe" />
                    </div>
                    <TitleCard width={350} height={600} />
                </div>
            </SplideSlide>
    
            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard delay={300} cardNumber={2}>
                        <p class='intro-paragraph'>Venus — Earth's twin, the Morning Star — has captured our collective imagination for more than 5,000 years. But until 1961, and the invention of radar telescopes, the planet's surface remained a mystery — neither the naked eye nor regular telescopes could pierce through its thick acid clouds.</p>
                
                        <p class='intro-paragraph'>Nearly all of the features on Venus are named after women: goddesses, heroines, famous women, and female first names. But not everyone on Earth can look at Venus and see themselves reflected back: 40% of those names are European in origin.</p>
                    </IntroTextCard>
                </div>
            </SplideSlide>
    
            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard delay={600} cardNumber={3}>
                        <p class='intro-paragraph'>Nearly all of the features on Venus are named after women: goddesses, heroines, famous women, and female first names. But not everyone on Earth can look at Venus and see themselves reflected back: 40% of those names are European in origin.</p>

                        <div>
                            <button id='intro-button' on:click={e => handlePageChange($activePage, $globe)} on:keypress={e => handlePageChange($activePage, $globe)}>Explore the names</button>
                        </div>
                    </IntroTextCard>
                </div>
            </SplideSlide>

            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard delay={600} cardNumber={4}>
                        <p class='intro-paragraph'>Nearly all of the features on Venus are named after women: goddesses, heroines, famous women, and female first names. But not everyone on Earth can look at Venus and see themselves reflected back: 40% of those names are European in origin.</p>
                    </IntroTextCard>
                </div>
            </SplideSlide>
        </Splide>
    </section>
</div>


<style lang="scss">
    .intro {
        margin: auto;
        max-width: 50vw;
    }

    .faded {
        opacity: 70%;
    }

    .intro-text {
		margin: 0px auto auto 10px;
		color: white;
	}

    .intro-card {
        margin: 15px;
    }

    .globe-wrapper {
		z-index: 100;
		position: absolute;
		max-width: 300px;
		max-height: 300px;
		overflow: hidden;
		transition: opacity 2s;
	}

    .intro-paragraph {
        display: inline-block;
        margin: 0rem 0rem 1.15rem 0rem;
        font-family: var(--gentium);
        line-height: 1.5rem;
        font-size: 1.2rem;
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
	}

	#intro-button:hover {
		cursor: pointer;
        opacity: 100%;
        transform: scale(1);
        transition: 0.1s ease all;
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