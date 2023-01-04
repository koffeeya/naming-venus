import dataSource from "../data/data.json";
import { data, updateData } from "../stores/global.js";

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
            //lat: lat,
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

/**
 * Filters the data for specific values in a variable, and then updates the $data store
 * @param {Array} filterObj - The entire filter object in store
 * @param {Array} targetValues - An array of values to target for the filter
 * @param {String} variable - The name of the field to filter, must match data source
 * @param {Array} dataToFilter - The data source to filter, most likely $data
 * @param {Boolean} activate - If true, the targeted values will be active. If false, they will be hidden
 *
 */
function filterData(filterObj, targetValues, variable, dataToFilter, activate) {
    let newFilterObj = {};
    let filteredData;
    const activeValues = filterObj[variable];
    const allFilters = Object.keys(filterObj);

    if (activate == true) {
        // add the new value to the existing active value array
        const newValues = [...new Set([...activeValues, ...targetValues])].sort();
        // filter on the data source so the value can be included
        filteredData = dataSource.filter((d) => newValues.includes(d[variable]));
        // generate the new filter object from the filtered data
        allFilters.map(category => {
            return newFilterObj[category] = [...new Set(filteredData.map(d => d[category]))].sort();
        })
        //console.log("adding", variable, targetValues, "to", activeValues, "-- now", newValues);
    } else if (activate == false) {
        const data = dataToFilter.length == 0 ? dataSource : dataToFilter;
        // remove the value from the existing active value array
        const newValues = activeValues.filter(v => !targetValues.includes(v)).sort();
        // filter existing data so the value is taken out
        filteredData = data.filter((d) => newValues.includes(d[variable]));
        // generate the new filter object from the filtered data
        allFilters.map(category => {
            return newFilterObj[category] = [...new Set(filteredData.map(d => d[category]))].sort();
        })
        //console.log("removing", variable, targetValues, "from", activeValues, "-- now", newValues);
    }
    //console.log(data.length, filteredData.length);
    updateData(filteredData, newFilterObj);
}

export {
    getThemeColor,
    moveGlobeToPoint,
    showGlobePoints,
    clearGlobePoints,
    filterData
};
