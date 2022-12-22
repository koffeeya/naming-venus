<script>
    import Globe from 'globe.gl';
    import * as THREE from 'three'
    import { data, globe, drawGlobe } from '../../stores/global.js';
    import { moveGlobeToPoint } from '../../js/utils.js';
    import { onMount } from 'svelte';

    // Initial draw of globe to create nodes
    export function init(data) {
        console.log("initial draw of globe with", data.length, "features")
        const textureImg = 'assets/venus-texture.png'
        const displacementImg = 'assets/height.jpg'

        const globeWrapper = document.querySelector(".title-section");
        const width = globeWrapper == null ? 350 : globeWrapper.offsetWidth * 0.8;

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

        // update store
        globe.set(world);
    }

    onMount(async () => {
        init($data);
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