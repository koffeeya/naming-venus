import { writable, derived } from "svelte/store";
import dataSource from '../data/data.json'

export const activePage = writable("Globe")
export const data = writable(dataSource);
export const selectedData = writable(dataSource);

export const globeWidth = writable(window.innerWidth);