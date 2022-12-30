<script>
    import Globe from 'globe.gl';
    // import { TextureLoader } from 'three'
    import { data, globe } from '../../stores/global.js';
    import { getThemeColor } from '../../js/utils.js';
    import { onMount } from 'svelte';

    function init(data) {
        console.log("drawing globe with", data.length, "features")

        // elements
        let elem = document.getElementById("globe-target");
        const globeWrapper = document.querySelector(".title-section");

        // assets
        const textureImg = 'assets/venus-texture.png'
        const displacementImg = 'assets/height.jpg'

        // globe settings
        const width = globeWrapper == null ? 275 : globeWrapper.offsetWidth * 0.6;
        const myGlobe = Globe({
            animateIn: false
        });

        let world = myGlobe(elem)
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

        // settings
        world.controls().autoRotate = true;
        world.controls().autoRotateSpeed = 0.4;
        myGlobe.globeMaterial().shininess = 0;

        // Add a displacement map - not needed since globe is so small?
        /* new TextureLoader().load(displacementImg, texture => {
            const globeMaterial = myGlobe.globeMaterial()
            globeMaterial.displacementMap = texture;
            globeMaterial.displacementScale = 25;
            globeMaterial.shininess = 0;
        }) */

        // update store
        globe.set(world);
    }

    onMount(async () => {
        init($data)
	});
</script>


<div id="globe-target"></div>

<style lang="scss">
    #globe-target {
        overflow: hidden;
    }
</style>