import dataSource from "../data/data.json";
import { updateData, setActivePage } from "../stores/global.js";

// Constant
const defaultFilters = {
    "type": [...new Set(dataSource.map(d => d["type"]))].sort(),
    "feature": [...new Set(dataSource.map(d => d["feature"]))].sort(),
    "continent": [...new Set(dataSource.map(d => d["continent"]))].sort(),
    "year": [...new Set(dataSource.map(d => d["year"]))].sort(),
}

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

// Move globe to point at a specific feature
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


// Reset globe view to default view, (0, 0)
function resetGlobe(world) {
    world.pointOfView(
        {
            lat: 0,
            lng: 0
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

// Fade the two pages in and out
function handlePageChange(activePage, globe) {
    const introSection = document.querySelector(`.intro-mode`);
    const mainSection = document.querySelector(`.main-mode`);
    const newPage = activePage == "intro" ? "main" : "intro";

    if (newPage == "intro") {
        //clearGlobePoints(globe);
        mainSection.style.opacity = 0;
        introSection.style.opacity = 1;
    } else {
        //showGlobePoints(idArray, $globe);
        mainSection.style.opacity = 1;
        introSection.style.opacity = 0;
    }

    setActivePage(newPage);
}

// Clean up a value if it is a string to remove whitespace
function parseValue(value) {
    if (typeof(value) == "string") {
        return value.toLowerCase().replace(" ","")
    } else {
        return value
    }
}

// Get the share of features that match the filters
// E.g. the share of features that are Famous Women
function getPercentages(data, defaultFilters) {
    let output = {}
    let sorted = {}
    const keys = Object.keys(defaultFilters)

    keys.map(variable => {
        output[variable] = []
        const obj = defaultFilters[variable]
        obj.map(value => {
            const values = data.filter((d) => d[variable] == value).length;
            const total = data.length;
            const percent = values == 0 ? 0 : total == 0 ? 0 : (values / total) * 100;
            output[variable].push([
                value,
                percent
            ]);
        })
    })

    keys.map(variable => {
        const arr = output[variable];
        const sortedOutput = arr.sort(function(a, b) {
            return b[1] - a[1];
        });
        sorted[variable] = sortedOutput;
    })

    return sorted;
}

export {
    defaultFilters,
    getThemeColor,
    moveGlobeToPoint,
    resetGlobe,
    showGlobePoints,
    clearGlobePoints,
    filterData,
    handlePageChange,
    parseValue,
    getPercentages
};
