<script>
    import Globe from 'globe.gl';
    import * as THREE from 'three'
    import { data, globe } from '../../stores/global.js';
    import { moveGlobeToPoint } from '../../js/utils.js';
    import { onMount } from 'svelte';

    const textureImg = 'assets/venus-texture.png'
    const displacementImg = 'assets/height.jpg'
    const targetId = "globe-target";

    function draw(data, width) {
        const myGlobe = Globe();
        const elem = document.getElementById(targetId);

        const world = myGlobe(elem)
            .width(width)
            .height(width)
            .backgroundColor("#03030300")
            .globeImageUrl(textureImg)
            .pointsData(data)
            .pointLat('center_lat')
            .pointLng('center_long')
            .pointAltitude(0.4)
            .pointRadius(3)
            .atmosphereColor(0x2d150400)
            .atmosphereAltitude(0)
            .pointColor((d) => {
                const color = "#ffffff00";
                return color;
            })
            /* .labelLat('center_lat')
            .labelLng('center_long')
            .pointLabel(d => `<p style='font-family: "TragicGrotesk", sans-serif;'>${d.name}</p>`) */

        const globeMaterial = myGlobe.globeMaterial()

        new THREE.TextureLoader().load(displacementImg, texture => {
            globeMaterial.displacementMap = texture;
            globeMaterial.displacementScale = 25;
            globeMaterial.shininess = 0;
        })

        // Add auto-rotation
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.6;

        return world;
    }

    onMount(async () => {
        const globeWrapper = document.querySelector(".globe-wrapper")
        const globeWidth = globeWrapper.offsetWidth;
        console.log("globe width", globeWidth);
        const world = draw($data, globeWidth);
        $globe = world;
        $globe.width = [globeWidth]
        $globe.height = [globeWidth]
	});
</script>


<div id={targetId}></div>



<style lang="scss">
    .scene-tooltip {
        font-family: "TragicGrotesk", sans-serif;
    }
</style>