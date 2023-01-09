import { writable, derived } from "svelte/store";
import dataSource from "../data/data.json";

export const windowWidth = writable(window.innerWidth);
export const windowHeight = writable(window.innerHeight);

export const isMobile = derived(windowWidth,
    $windowWidth => $windowWidth <= 560 ? true : false
)

export const isMidsize = derived(windowWidth,
    $windowWidth => $windowWidth > 560 && $windowWidth <= 900 ? true : false
)

export const isLarge = derived(windowWidth,
    $windowWidth => $windowWidth > 1200 ? true : false
)

export const cardsPerPage = derived(windowWidth,
    $windowWidth => $windowWidth <= 560 ? 6 : 9
)


export const data = writable(dataSource);
export const visibleData = writable(6);
export const activeFilter = writable([]);
export const page = writable(0);

// globe
export const globeWidth = writable(window.innerWidth);
export const globe = writable();
export const activePage = writable("intro"); // or main
export const pageTheme = writable("Default");

// filters
export const defaultFilters = {
    "type": [...new Set(dataSource.map(d => d["type"]))].sort(),
    "feature": [...new Set(dataSource.map(d => d["feature"]))].sort(),
    "continent": [...new Set(dataSource.map(d => d["continent"]))].sort(),
    "year": [...new Set(dataSource.map(d => d["year"]))].sort(),
}

export const filterObj = writable(defaultFilters)

export function updateData(newData, newFilterObj) {
    console.log("updating data", newData, newFilterObj);
    data.set(newData);
    filterObj.set(newFilterObj);
    page.set(0);
    pageTheme.set("Default");
}

export function resetData() {
    page.set(0)
    data.set(dataSource);
    filterObj.set(defaultFilters);
    pageTheme.set("Default");
}

export function setActivePage(newPage) {
    activePage.set(newPage)
}