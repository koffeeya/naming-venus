<script>
   import Globe from 'globe.gl';
   import { TextureLoader } from 'three'
   import { data } from '../../stores/global.js'
   import { onMount } from 'svelte';


   onMount(async () => {
    const contourImg = 'src/assets/venus-contour.png'
    const displacementImg = 'src/assets/height.jpg'

    const venus = Globe()
        (document.getElementById('globe-viz'))
        .globeImageUrl(contourImg)
        .pointsData($data)
        .pointLat('center_lat')
        .pointLng('center_long')
        

    const globeMaterial = venus.globeMaterial();
    new TextureLoader().load(contourImg, texture => {
      globeMaterial.map = texture;
      globeMaterial.displacementMap = displacementImg
    });

	});

   
</script>

<div id='globe-viz'></div>

<style>

</style>