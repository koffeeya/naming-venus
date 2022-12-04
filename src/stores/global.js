import { writable, derived } from "svelte/store";
import dataSource from '../data/data.json'

export const windowWidth = writable(window.innerWidth);
export const windowHeight = writable(window.innerHeight);

export const isMobile = derived(windowWidth,
    $windowWidth => $windowWidth <= 560 ? true : false
)

export const isLarge = derived(windowWidth,
    $windowWidth => $windowWidth > 1200 ? true : false
)

export const activePage = writable("Globe")
export const data = writable(dataSource);
export const selectedData = writable(dataSource);