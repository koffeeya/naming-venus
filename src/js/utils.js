import dataSource from "../data/data.json";
import { data } from "../stores/global.js";

// run a function on a delay
const debounce = (func, delay) => {
    let timer;

    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
};

// Get the theme color based on the feature
// Optional "alpha" param to control transparency (0-100)
function getThemeColor(type, alpha, light) {
    const colorMap = {
        "Default": "#6b6b6b",
        "Goddess": "#D7A954",
        "Heroine": "#8AB67B",
        "First Name": "#6CB4CC",
        "Famous Woman": "#C97889",
        "Other": "#9B9B9B",
    };

    //#f7e8ea
    const lightColorMap = {
        "Default": "#dddddd",
        "Goddess": "#f6e1c5",
        "Heroine": "#d8e7d2",
        "First Name": "#d0e6ee",
        "Famous Woman": "#efd1d6",
        "Other": "#9B9B9B",
    };

    let hexBase;

    if (light == true) {
        hexBase = lightColorMap[type] == undefined ? "Default" : lightColorMap[type];
    } else {
        hexBase = colorMap[type] == undefined ? "Default" : colorMap[type];
    }

    const hexAlpha = alpha ? `0${Math.round((255 / 100) * alpha).toString(16)}`.slice(-2).toUpperCase() : "";
    const output = `${hexBase}${hexAlpha}`;

    return output;
}

function moveGlobeToPoint(id, data, world) {
    const found = data.find((element) => element.feature_id == id);
    const lat = found.center_lat;
    const lng = found.center_long;

    world.pointOfView(
        {
            lat: lat,
            lng: lng,
        },
        300
    );
}

// show one or more points on the globe
function showGlobePoints(idArray, world) {
    if (idArray == null || idArray == [] || idArray == undefined) {
        world.pointRadius(d => 0)
    } else {
        world.pointRadius((d) => {
            if (idArray.includes(d.feature_id)) {
                return 1
            } else {
                return 0
            }
        })
    }
}

function clearGlobePoints(world) {
    world.pointRadius(d => 0)
}

export { getThemeColor, moveGlobeToPoint, showGlobePoints, clearGlobePoints };
