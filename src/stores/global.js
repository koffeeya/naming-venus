import { writable, derived } from "svelte/store";
import dataSource from '../data/data.json'

export const data = writable(dataSource);
export const selectedData = writable();

export const globeWidth = writable(window.innerWidth);
export const globe = writable();

export const activePage = writable("intro");