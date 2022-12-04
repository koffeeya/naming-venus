<script>
    import Globe from 'globe.gl';
    import * as THREE from 'three'
    import { data, selectedData } from '../../stores/global.js'
    import { onMount } from 'svelte';

    const textureImg = 'assets/venus-texture.png'
    const displacementImg = 'assets/height.jpg'
    const targetId = "globe-target";

    function draw(data) {
        const myGlobe = Globe()
        const elem = document.getElementById(targetId)

        myGlobe(elem)
            .globeImageUrl(textureImg)
            .pointsData(data)
            .pointLat('center_lat')
            .pointLng('center_long')
            .pointAltitude(0.3)
            .pointRadius(0.8)
            .atmosphereColor(0x2d1504)
            .atmosphereAltitude(0)
            .pointColor((d) => {
                //const color = themeColor(d.type, false).toString()
                const color = "#ffffff00"
                return color;
            })
            .labelLat('center_lat')
            .labelLng('center_long')
            .onPointHover(point => myGlobe
                .pointColor((d) => {
                    const pointColor = !point ? "#ffffff00" : d == point ? "#ffffff33" : "#ffffff00"
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
		draw($data);
	});
</script>

<div id={targetId}></div>

<style lang="scss">
</style>