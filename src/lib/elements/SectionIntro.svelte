<script>
    import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
    import { activePage, globe } from "../../stores/global";
    import { handlePageChange } from "../../js/utils";
    import IntroTextCard from "./IntroTextCard.svelte";
    import Globe from "../globe/Globe.svelte";
    import TitleCard from "../svg/TitleCard.svelte";
    import { fade } from "svelte/transition";
    import "@splidejs/splide/dist/css/splide.min.css";

    $: globeMargin = $activePage == "intro" ? "134px 40px" : "0% 0%";

    const options = {
        focus  : 'center',
        autoWidth: true,
    }
</script>

<div class='intro'>
    <h2 class='sr-only'>Introduction</h2>

    <section class='carousel'>
        <Splide {options} aria-label="Introduction" style='padding: 0rem 0.5rem 1.3rem 0.5rem;'>
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
                    <IntroTextCard cardNumber={2}>
                        <p class='intro-paragraph'>Venus — Earth's twin, the Morning Star, the brightest planet in our sky — has captured our imagination for more than 5,000 years. But until remarkably recently, its surface was a mystery. Neither the naked eye nor regular telescopes can see through the thick acid clouds that envelop the whole planet.</p>
                
                        <p class='intro-paragraph'>The invention of radar telescopes in 1961 brought about a flurry of interest in Venus </p>
                    </IntroTextCard>
                </div>
            </SplideSlide>
    
            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard cardNumber={3}>
                        <p class='intro-paragraph'>Nearly all of the features on Venus are named after women: goddesses, heroines, famous women, and female first names. But not everyone on Earth can look at Venus and see themselves reflected back: 40% of those names are European in origin.</p>

                        <div class='intro-button-wrapper'>
                            <button id='intro-button' on:click={e => handlePageChange($activePage, $globe)} on:keypress={e => handlePageChange($activePage, $globe)}>Explore the names</button>
                        </div>
                    </IntroTextCard>
                </div>
            </SplideSlide>

            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard cardNumber={4}>
                        <p class='about-data-paragraph'>This project's data source is the International Astronomical Union’s <a href='' target="_blank">Gazetteer of Planetary Nomenclature</a>. The countries of origin were edited slightly for clarity and accuracy.</p>

                        <p class='about-data-paragraph'>The biographies and images shown in the Famous Women cards were scraped from Wikipedia using the Python <a href="https://pypi.org/project/wikipedia/" target="_blank"><code>wikipedia</code></a> package.</p>

                        <p class='about-data-paragraph'>The site is made in <a href="https://svelte.dev/" target="_blank">Svelte</a>. The globe uses Vasco Asturiano’s <a href="https://globe.gl/" target="_blank">Globe.GL</a> package, a convenience wrapper for ThreeJS. The globe's contour map is derived from a 1993 <a href="https://astrogeology.usgs.gov/search/map/Venus/Magellan/RadarProperties/Venus_Magellan_Topography_Global_4641m_v02" target="_blank">topographic elevation map</a> captured by NASA's Magellan team. The map was taken into <a href="https://www.qgis.org/en/site/" target="_blank">QGIS</a> to generate contours, exported as an SVG file, and styled using Adobe Illustrator.</p>

                        <p class='about-data-paragraph'>This project is a capstone for the CUNY Graduate Center’s <a href="https://www.gc.cuny.edu/data-analysis-and-visualization/curriculum-and-degree-information" target="_blank">M.S. in Data Analysis & Visualization</a> program for fall 2022.  It was inspired by the works of Eleanor Lutz, Patricia Monaghan, and Inkleby.</p>

                        <p class='about-data-paragraph'>Special thanks to Aucher Serr, Matthew Gold, Jason Nieslen, and my colleagues at <a href="https://twitter.com/axiosvisuals" target="_blank">Axios Visuals</a> for their support. And to Leighton, who made me so many cups of tea.</p>

                        <p class='about-data-paragraph'>By Kavya Beheraj &nbsp;&nbsp; <a href="https://twitter.com/KavyaBeheraj" target="_blank">Twitter</a>  &nbsp;|&nbsp;  <a href="https://www.linkedin.com/in/kavyabeheraj/" target="_blank">LinkedIn</a>  &nbsp;|&nbsp;  <a href="mailto:kavya.beheraj@gmail.com" target="_blank">Email</a></p>
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

    .about-data-paragraph {
        display: inline-block;
        margin: 0rem 0rem 1.15rem 0rem;
        line-height: 1.05rem;
        font-size: 0.87rem;
        font-family: var(--tragic-grotesk);
        color: rgb(168, 168, 168);
    }

    .intro-button-wrapper {
        margin: auto;
        display: flex;
    }

    #intro-button {
		display: inline-block;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		margin: 3% auto;
		text-decoration: none;
		background: white;
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