<script lang="ts">
	import { selectedProject } from "./stores";

	export let title: string;
	export let tags: string[];
	export let projectData: any; // can pass whole project object

	function select() {
		selectedProject.set(projectData);
	}
</script>

<button
	class="project-card"
	class:selected={$selectedProject === projectData}
	aria-pressed={$selectedProject === projectData}
	onclick={select}
>
	<h2>> {title}</h2>
	<h5>{tags.join(', ')}</h5>
</button>

<style lang="scss";>
	@import '../styles/variables.scss';

	.project-card {
		display: block;
		text-align: left;
		border: 1px solid transparent;
		border-radius: $radius;
		padding: 0.5rem;
		background: transparent;
		color: $color-mossy;
		font-family: $font-family;
		font-size: 1rem;
		cursor: pointer;
		transition: color $transition;

		&:hover {
			color: $color-moonlight;
			text-shadow: 0 0 5px $color-moonlight;
		}

		&.selected {
			color: $color-dusk;

			&:hover {
				color: $color-twilight;
				text-shadow: 0 0 5px $color-twilight;
			}
		}

		h2 {
			text-transform: uppercase;
		}
	}
</style>
