<script>
    import Globe from 'globe.gl';
    import * as THREE from 'three'
    import { data } from '../../stores/global.js'
    import { onMount } from 'svelte';
    import { debounce, getThemeColor } from '../../js/utils.js'

    const textureImg = 'assets/venus-texture.png'
    const displacementImg = 'assets/height.jpg'
    const targetId = "globe-target";
    let world;

    function draw(data, width) {
        const myGlobe = Globe()
        const elem = document.getElementById(targetId)

        world = myGlobe(elem)
            .width(width)
            .height(width)
            .backgroundColor("#03030300")
            .globeImageUrl(textureImg)
            .pointsData(data)
            .pointLat('center_lat')
            .pointLng('center_long')
            .pointAltitude(0.2)
            .pointRadius(0.9)
            .atmosphereColor(0x2d150400)
            .atmosphereAltitude(0)
            .pointColor((d) => {
                //const color = themeColor(d.type, false).toString()
                const color = "#ffffff00";
                return color;
            })
            .labelLat('center_lat')
            .labelLng('center_long')
            .onPointHover(point => myGlobe
                .pointColor((d) => {
                    const pointColor = !point ? "#ffffff00" : d == point ? getThemeColor(d.type) : "#ffffff00"
                    return pointColor;
                })
            )
            .onPointClick((d) => {
                console.log(d);
            })

        const globeMaterial = myGlobe.globeMaterial()

        new THREE.TextureLoader().load(displacementImg, texture => {
            globeMaterial.displacementMap = texture;
            globeMaterial.displacementScale = 25;
            globeMaterial.shininess = 0;
        })
    }

    onMount(async () => {
        const globeWrapper = document.querySelector(".globe-wrapper")
        const globeWidth = globeWrapper.offsetWidth;
        globeWrapper.height = globeWidth;
        console.log("globe width", globeWidth);
        draw($data, globeWidth);
        world.width = [globeWidth]
        world.height = [globeWidth]
	});
</script>

<div id={targetId}></div>



<style lang="scss">
</style>