<script>
    import Globe from 'globe.gl';
    import * as THREE from 'three'
    import { data, globe } from '../../stores/global.js';
    import { moveGlobeToPoint } from '../../js/utils.js';
    import { onMount } from 'svelte';

    const textureImg = 'assets/venus-texture.png'
    const displacementImg = 'assets/height.jpg'
    const targetId = "globe-target";

    function drawGlobe(data, width) {
        const myGlobe = Globe();
        const elem = document.getElementById("globe-target");

        const world = myGlobe(elem)
            .width(width)
            .height(width)
            .backgroundColor("#03030300")
            .globeImageUrl(textureImg)
            .pointsData(data)
            .pointLat('center_lat')
            .pointLng('center_long')
            .pointAltitude(2)
            .pointRadius(1.5)
            .atmosphereColor(0x2d150400)
            .atmosphereAltitude(0)
            .pointLabel('')
            .pointColor((d) => {
                const color = "#ffffff00";
                return color;
            })

        const globeMaterial = myGlobe.globeMaterial()

        new THREE.TextureLoader().load(displacementImg, texture => {
            /* globeMaterial.displacementMap = texture;
            globeMaterial.displacementScale = 25; */
            globeMaterial.shininess = 0;
        })

        // Add auto-rotation
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.6;

        return world;
    }

    

    onMount(async () => {
        const globeWrapper = document.querySelector(".title-section");
        const globeWidth = globeWrapper.offsetWidth * 0.8;
        $globe = drawGlobe($data, globeWidth);
        $globe.width = [globeWidth]
        $globe.height = [globeWidth]
	});
</script>


<div id="globe-target"></div>



<style lang="scss">
    .scene-tooltip {
        font-family: "TragicGrotesk", sans-serif;
    }
</style>