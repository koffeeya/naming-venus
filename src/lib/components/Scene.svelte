<script>
    import { SphereGeometry, MeshStandardMaterial } from 'three'
    import {
        Mesh,
        PerspectiveCamera,
        OrbitControls,
        AmbientLight,
        useTexture,
        Object3DInstance
    } from '@threlte/core'
    import ThreeGlobe from 'three-globe';
    import { data } from '../../stores/global.js'

    /* 
    Make the globe and add the data layer using Three Globe
    Render the mesh using Threlte
    */

    const geometry = new SphereGeometry(2.3, 128, 128)
    const Globe = new ThreeGlobe()
        .pointsData($data)
        .pointLat('center_lat')
        .pointLng('center_long')

    const contourMapUrl = 'src/assets/venus-contour.png'
    const displacementMapUrl = 'src/assets/height.jpg'
    const [contour, displacement] = useTexture([contourMapUrl, displacementMapUrl])
    const material = new MeshStandardMaterial({
        color: 'white',
        map: contour,
        displacementMap: displacement,
    })
    
    //geometry.computeVertexNormals()
</script>

<PerspectiveCamera fov={60} position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }}>
	<OrbitControls autoRotate={false} enableZoom={true} />
</PerspectiveCamera>

<AmbientLight intensity={1} />
<Mesh interactive {material} {geometry}/>

<Object3DInstance object={Globe} scale={0.02}/>

<style>
</style>