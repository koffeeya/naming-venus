import { writable, derived } from "svelte/store";
import dataSource from '../data/data.json'
import Globe from 'globe.gl';
import * as THREE from 'three'

export const data = writable(dataSource);
export const selectedData = writable();

export const globeWidth = writable(window.innerWidth);
export const globe = writable();

export const activePage = writable("intro");

export function setActivePage(page) {
    activePage.set(page)
}

export function drawGlobe(data) {
    console.log("redrawing globe with", data.length, "features")
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
        .pointAltitude(0)
        .pointRadius(0.5)
        .atmosphereColor(0x2d150400)
        .atmosphereAltitude(0)
        .pointLabel('')
        .pointColor((d) => {
            // If all features are shown
            if (data.length == dataSource.length) {
                return "#ffffff00";
            } else {
                return "#ffffff66"
            }
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

export function filterData(filterObj) {
    console.log("filtering", filterObj);
    if (filterObj == undefined || filterObj[0].value.length == 0) {
        console.log("keeping old data", data);
        data.set(dataSource);
        drawGlobe(dataSource);
    } else {
        const filtered = dataSource.filter(item => {
            return filterObj.every(filter => {
                return filter.value.includes(item[filter.id])
            })
        })
        data.set(filtered);
        drawGlobe(filtered);
        console.log("new data", filtered);
    }
}

export function resetData() {
    console.log("resetting data")
    data.set(dataSource);
    drawGlobe(dataSource);
}
