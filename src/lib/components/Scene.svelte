<script>
    import { SphereGeometry, MeshStandardMaterial, TextureLoader, Scene } from 'three'
    import {
        Mesh,
        PerspectiveCamera,
        OrbitControls,
        DirectionalLight,
        useTexture,
        Object3DInstance
    } from '@threlte/core'
    import ThreeGlobe from 'three-globe';
    import { data } from '../../stores/global.js'

    function themeColor(type, transparent){
        const typeMap = {
            "Goddess": "#D7A954",
            "Heroine": "#8AB67B",
            "First Name": "#6CB4CC",
            "Famous Woman": "#C97889",
            "Other": "#9B9B9B"
        }

        if (transparent == true) {
            return `${typeMap[type]}26`;
        } else if (transparent == false) {
            return typeMap[type]
        }
    }

    let Globe;

    /* 
    Make the globe and add the data layer using Three Globe
    Render the mesh using Threlte
    Not sure why intellisense isn't recognizing the objects?
    */
    const contourImg = 'src/assets/venus-contour.png'
    const displacementImg = 'src/assets/height.jpg'

    //const geometry = new SphereGeometry(2.3, 128, 128)
    Globe = new ThreeGlobe({waitForGlobeReady: false})
            .globeImageUrl(contourImg)
            .pointsData($data)
            .pointLat('center_lat')
            .pointLng('center_long')
            .pointAltitude(0.2)
            .pointColor((d) => {
                const color = themeColor(d.type, false).toString()
                return color;
            })

    const globeMaterial = Globe.globeMaterial()

    // Creating a material, the Three Globe way
    new TextureLoader().load(displacementImg, texture => {
        globeMaterial.displacementMap = texture;
        globeMaterial.displacementScale = 25;
    })

    const myScene = new ThreeGlobe.Scene();
    myScene.add(Globe)

</script>

<!-- <PerspectiveCamera fov={80} position={{ x: 50, y: 50, z: 50 }} lookAt={{ x: 0, y: 0, z: 0 }}>
    <OrbitControls autoRotate={false} enableZoom={true} />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10, z: 10 }} />
<Mesh interactive {material} {geometry}/>

<Object3DInstance object={Globe}  scale={0.5}/> -->


<style>
</style>