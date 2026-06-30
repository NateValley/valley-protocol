import { writable } from "svelte/store";
import type { Project } from "./projects";

export const selectedProject = writable<Project | null>(null);

export const navItems = [
	{ label: 'projects', href: '/valley-protocol/'},
	{ label: 'about me!', href: '/valley-protocol/about'},
	{ label: 'resume', href: '/valley-protocol/resume'},
	{ label: 'contact', href: '/valley-protocol/contact'}
]

export const tags = [
	'systems design',
	'game programming',
	'multiplayer programming',
	'tools programming'
];