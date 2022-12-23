import { active } from "d3";
import { writable, derived } from "svelte/store";
import dataSource from "../data/data.json";

export const data = writable(dataSource);
export const activeFilter = writable([]);

export const globeWidth = writable(window.innerWidth);
export const globe = writable();

export const activePage = writable("intro");

export function setActivePage(page) {
    activePage.set(page);
}

export function filterData(filterObj) {
    console.log("filtering", filterObj);

    if (filterObj == null || filterObj == undefined || filterObj[0].value.length == 0) {
        console.log("keeping old data");
        activeFilter.set([]);
        data.set(dataSource);
    } else {
        const filtered = dataSource.filter((item) => {
            return filterObj.every((filter) => {
                return filter.value.includes(item[filter.id]);
            });
        });
        activeFilter.set(filterObj);
        data.set(filtered);
        console.log("new data", filtered);
    }
}

export function resetData() {
    console.log("resetting data");
    data.set(dataSource);
    activeFilter.set([])
}

export function setGlobeData(data) {
    console.log("setting new globe data", globe);
    globe.set(globe.pointsData(data));
}
