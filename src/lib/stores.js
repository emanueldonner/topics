import { writable } from 'svelte/store';

export let showModal = writable(false);

export let entries = writable([]);

export let entryToEdit = writable(null);
