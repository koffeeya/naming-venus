<script>
    import { SphereGeometry, MeshStandardMaterial } from 'three'
    import {
        DirectionalLight,
        Mesh,
        PerspectiveCamera,
        OrbitControls,
        AmbientLight,
        useTexture
    } from '@threlte/core'

    const geometry = new SphereGeometry(2.3, 128, 128)
    const contourMapUrl = 'src/assets/venus-contour.png'
    const displacementMapUrl = 'src/assets/height.jpg'
    const [contour, displacement] = useTexture([contourMapUrl, displacementMapUrl])
    const material = new MeshStandardMaterial({
        color: 'white',
        map: contour,
        displacementMap: displacement,
    })
    
    geometry.computeVertexNormals()
</script>

<PerspectiveCamera fov={60} position={{ x: 3, y: 3, z: 3 }} lookAt={{ x: 0, y: 0, z: 0 }}>
	<OrbitControls autoRotate={false} enableZoom={true} />
</PerspectiveCamera>

<!-- <DirectionalLight position={{ x: 3, y: 10, z: 10 }} /> -->
<AmbientLight intensity={1} />
<Mesh interactive {material} {geometry}/>

<style>

</style>