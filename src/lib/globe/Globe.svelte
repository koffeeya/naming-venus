<script>
    import Globe from 'globe.gl';
    import * as THREE from 'three'
    import { data, globe, setGlobeData } from '../../stores/global.js';
    import { onMount } from 'svelte';
    import dataSource from '../../data/data.json'
    import { getThemeColor } from '../../js/utils.js';

    // instead of re-rendering the globe every time data updates, maybe just re-assign globe.pointsData(data)?
    // there needs to be an initial globe setup, and then an update

    function init(data, dataSource) {
        console.log("drawing globe with", data.length, "features")

        // elements
        const elem = document.getElementById("globe-target");
        const globeWrapper = document.querySelector(".title-section");

        // assets
        const textureImg = 'assets/venus-texture.png'
        const textureImgGrayscale = 'assets/venus-texture-grayscale.png'
        const displacementImg = 'assets/height.jpg'

        // globe settings
        const width = globeWrapper == null ? 275 : globeWrapper.offsetWidth * 0.6;
        const myGlobe = Globe({
            animateIn: false
        });

        let world;
        
        // If showing all points, just render the globe without points
        if (data.length == dataSource.length) {
            world = myGlobe(elem)
                .width(width)
                .height(width)
                .backgroundColor("#03030300")
                .globeImageUrl(textureImg)
                .atmosphereColor(0x2d150400)
                .atmosphereAltitude(0)
                //points info
                /* .pointsData(data)
                .pointLat('center_lat')
                .pointLng('center_long')
                .pointAltitude(0)
                .pointRadius(0.6)
                .pointColor((d) => {
                    return getThemeColor(d.type, 100, false)
                }) */
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
                .pointAltitude(0)
                .pointRadius(0.6)
                .pointColor((d) => {
                    return getThemeColor(d.type, 100, false)
                })
        }

        myGlobe.globeMaterial().shininess = 0;

        // Add a displacement map - not needed since globe is so small?
        /* new THREE.TextureLoader().load(displacementImg, texture => {
            const globeMaterial = myGlobe.globeMaterial()
            globeMaterial.displacementMap = texture;
            globeMaterial.displacementScale = 25;
            globeMaterial.shininess = 0;
        }) */

        // Add auto-rotation
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.4;

        // update store
        globe.set(world);
    }

    onMount(async () => {
        init($data, dataSource)
	});
</script>


<div id="globe-target"></div>

<style lang="scss">
    .scene-tooltip {
        font-family: "TragicGrotesk", sans-serif;
    }

    .globe-target {
        overflow: hidden;
    }
</style>