import { writable, derived } from "svelte/store";
import { defaultFilters, getPercentages } from "../js/utils";
import dataSource from "../data/data.json";

export const windowWidth = writable(window.innerWidth);
export const windowHeight = writable(window.innerHeight);
export const modalLocation = writable(0);

export const isMobile = derived(windowWidth,
    $windowWidth => $windowWidth <= 560 ? true : false
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

export const filterObj = writable(defaultFilters)
export const percentages = derived(data,
    data => getPercentages(data, defaultFilters)
)

export function updateData(newData, newFilterObj) {
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

export function setPercentages(newArr) {
    percentages.set(newArr)
}

export function setModalLocation(newValue) {
    modalLocation.set(newValue)
}