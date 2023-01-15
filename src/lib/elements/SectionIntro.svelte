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
                        <p class='intro-paragraph'>Venus — Earth's twin, the Morning Star, the brightest planet — has captured our collective imagination for more than 5,000 years.</p>

                        <p class='intro-paragraph'>But for a remarkably long time, its surface was a mystery. Normal telescopes can't see through the dense sulfuric acid clouds that envelop the whole planet.</p>
                
                        <p class='intro-paragraph'>It was only in the last 50 years, and the invention of radar imaging, that astronomers could peer through the clouds and see craters, valleys, and mountains on Venus for the first time.</p>

                        <p class='intro-paragraph'>There was an explosion of discovery — and what we saw, we named.</p>
                    </IntroTextCard>
                </div>
            </SplideSlide>
    
            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard cardNumber={3}>
                        <p class='intro-paragraph'>Why do we name features on other worlds?</p>

                        <p class='intro-paragraph'>It's more than just convenience: naming is an expression of culture and ownership. An alien landscape feels more human, more <em>ours</em>, when we call it names from home.</p>

                        <p class='intro-paragraph'>On Venus, nearly every one of its 1,976 recorded features honor women: famous women, heroines, goddesses, and female names.</p>

                        <p class='intro-paragraph'>But 40% of those names are European in origin, reflecting the bias of those early astronomers who discovered so many features so quickly.</p>

                    </IntroTextCard>
                </div>
            </SplideSlide>

            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard cardNumber={3}>
                        <p class='intro-paragraph'>Every feature on Venus tells a story, and this project is my attempt to more easily find and explore those stories.</p>

                        <p class='intro-paragraph'>Explore 1,976 names of Venus, and especially look for the 769 goddesses, heroines, and famous women with extra color and detail.</p>

                        <p class='intro-paragraph'>The names we give our surroundings reveal more about ourselves — and our values — than they do the landscape we observe.</p>

                        <p class='intro-paragraph'>See what stories you can find:</p>

                        <div class='intro-button-wrapper'>
                            <button id='intro-button' on:click={e => handlePageChange($activePage, $globe)} on:keypress={e => handlePageChange($activePage, $globe)}>Explore the names</button>
                        </div>
                    </IntroTextCard>
                </div>
            </SplideSlide>

            <SplideSlide>
                <div class='intro-card'>
                    <IntroTextCard cardNumber={4}>
                        <p class='about-data-paragraph'>This project's data source is the International Astronomical Union’s <a href='https://planetarynames.wr.usgs.gov/SearchResults?Target=15_Venus' target="_blank">Gazetteer of Planetary Nomenclature</a>. Note that some of the terms used by the IAU are out of date.</p>

                        <p class='about-data-paragraph'>Extended descriptions for 769 features were collected using the Python <a href="https://pypi.org/project/wikipedia/" target="_blank">wikipedia</a> package and individually edited for clarity.</p>

                        <p class='about-data-paragraph'>The site is made in <a href="https://svelte.dev/" target="_blank">Svelte</a>. The globe uses Vasco Asturiano’s <a href="https://globe.gl/" target="_blank">Globe.GL</a> package, a convenience wrapper for ThreeJS. The globe's contour map is derived from a 1993 <a href="https://astrogeology.usgs.gov/search/map/Venus/Magellan/RadarProperties/Venus_Magellan_Topography_Global_4641m_v02" target="_blank">topographic elevation map</a> captured by NASA's Magellan team. The map was taken into <a href="https://www.qgis.org/en/site/" target="_blank">QGIS</a> to generate contours, exported as an SVG file, and styled using Adobe Illustrator.</p>

                        <p class='about-data-paragraph'>This project is a capstone for the CUNY Graduate Center’s <a href="https://www.gc.cuny.edu/data-analysis-and-visualization/curriculum-and-degree-information" target="_blank">M.S. in Data Analysis & Visualization</a> program for fall 2022.  It was inspired by the works of <a href="https://tabletopwhale.com/2017/03/06/goddesses-of-venus.html" target="_blank">Eleanor Lutz</a>, <a href="https://bookshop.org/p/books/encyclopedia-of-goddesses-heroines-revised-patricia-monaghan/107143" target="_blank">Patricia Monaghan</a>, <a href="https://wenamethestars.inkleby.com/world/venus" target="_blank">Inkleby</a>, and <a href="https://hargitaihenrik.wordpress.com/" target="_blank">Henrik Hargitai</a>.</p>

                        <p class='about-data-paragraph'>Special thanks to Aucher Serr, Matthew Gold, Jason Nieslen, and my colleagues at Axios Visuals for their support. And to Leighton, who made me so many cups of tea.</p>

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