<script>
    import Globe from 'globe.gl';
    // import { TextureLoader } from 'three'
    import { data, globe, activePage } from '../../stores/global.js';
    import { getThemeColor } from '../../js/utils.js';
    import { onMount } from 'svelte';

    export let targetNode;

    function init(data, targetNode) {
        /* const newElement = document.createElement("div");
        newElement.setAttribute('id', targetNode);
        const elem = document.getElementById(targetNode); */
        console.log("drawing globe with", data.length, "features")

        // elements
        const elem = document.getElementById(targetNode);
        const globeWrapper = document.querySelector(".title-section");
        const textureImg = 'assets/venus-texture.png'

        // globe settings
        //const width = globeWrapper == null ? 275 : globeWrapper.offsetWidth * 0.7;
        const width = $activePage == "intro" ? 275 : 375;
        const myGlobe = Globe({
            animateIn: false
        });

        let world;

        if (targetNode == 'intro-globe') {
            world = myGlobe(elem)
                .width(width)
                .height(width)
                .backgroundColor("#03030300")
                .globeImageUrl(textureImg)
                .atmosphereColor(0x2d150400)
                .atmosphereAltitude(0)
        } else {
            world = myGlobe(elem)
                .width(width)
                .height(width)
                .backgroundColor("#03030300")
                .globeImageUrl(textureImg)
                .atmosphereColor(0x2d150400)
                .atmosphereAltitude(0)
                //points info
                .pointsData(data)
                .pointLat('center_lat')
                .pointLng('center_long')
                .pointAltitude(0.1)
                .pointRadius(0) // initial value
                .pointColor((d) => {
                    return getThemeColor(d.type, 100, false)
                })
            
            // update store with the cards globe
            globe.set(world);
        }
        
        // settings
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.4;
        myGlobe.globeMaterial().shininess = 0;

        /* 
        // Add a displacement map - not needed since globe is so small
        const displacementImg = 'assets/height.jpg'
        new TextureLoader().load(displacementImg, texture => {
            const globeMaterial = myGlobe.globeMaterial()
            globeMaterial.displacementMap = texture;
            globeMaterial.displacementScale = 25;
            globeMaterial.shininess = 0;
        }) 
        */
    }

    onMount(async () => {
        init($data, targetNode);
	});
</script>

<div>
    {#if targetNode=='intro-globe'}
        <div id='intro-globe'></div>
    {:else}
        <div id='cards-globe'></div>
    {/if}
</div>


<style lang="scss">
    #intro-globe, #cards-globe {
        opacity: 1;
        transition: 0.4s ease all;
    }
</style>