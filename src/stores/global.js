import { writable, derived } from "svelte/store";
import dataSource from "../data/data.json";

export const data = writable(dataSource);
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
    "origin": [...new Set(dataSource.map(d => d["origin"]))].sort(),
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