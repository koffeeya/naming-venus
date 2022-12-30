import { writable } from "svelte/store";
import dataSource from "../data/data.json";

export const data = writable(dataSource);
export const activeFilter = writable([]);
export const page = writable(0)

// globe
export const globeWidth = writable(window.innerWidth);
export const globe = writable();
export const activePage = writable("intro"); // or main
export const pageTheme = writable("Default");

// Takes a filter object and updates the data source
export function filterData(filterObj) {
    console.log("filtering", filterObj);
    page.set(0)

    if (filterObj == null || filterObj == undefined || filterObj.length == 0) {
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
    page.set(0)
    data.set(dataSource);
    activeFilter.set([]);
    pageTheme.set("Default");
}
