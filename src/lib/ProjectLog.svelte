<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { selectedProject } from "./stores";

	let groupedLogs = new Map();
	let projectTagsElement: HTMLHeadingElement | undefined;
	let projectTagsFontSize = 0.78;
	const maxProjectTagsFontSize = 0.78;
	const minProjectTagsFontSize = 0.45;

	$: groupedLogs = (() => {
			if (!$selectedProject?.logs) return new Map();

			const map = new Map();
			for (const entry of $selectedProject?.logs) {
				if (!map.has(entry.tag)) {
					map.set(entry.tag, []);
				}

				map.get(entry.tag).push(entry);
			}
			return map;
		})();

	$: if ($selectedProject && projectTagsElement) {
		fitProjectTags();
	}

	async function fitProjectTags() {
		projectTagsFontSize = maxProjectTagsFontSize;
		await tick();

		if (!projectTagsElement) return;

		const { clientWidth, scrollWidth } = projectTagsElement;
		if (clientWidth <= 0 || scrollWidth <= clientWidth) return;

		projectTagsFontSize = Math.max(
			minProjectTagsFontSize,
			maxProjectTagsFontSize * (clientWidth / scrollWidth) * 0.98
		);
	}

	onMount(() => {
		const resizeObserver = new ResizeObserver(() => fitProjectTags());

		if (projectTagsElement) {
			resizeObserver.observe(projectTagsElement);
		}

		return () => resizeObserver.disconnect();
	});
</script>

{#if $selectedProject}
	<div class="project-log">
		<h1 class="project-title">{$selectedProject.title.toUpperCase()}</h1>
		<h5
			class="project-tags"
			bind:this={projectTagsElement}
			style:font-size={`${projectTagsFontSize}rem`}
		>
			{$selectedProject.tags.join(', ').toUpperCase()}
		</h5>
	
		{#if !$selectedProject.logs?.length}
			<div class="section">
				<h3 class="log-tag">> NO LOGS FOUND :[</h3>
			</div>
		{:else}
			{#each Array.from(groupedLogs.entries()) as [tag, entries]}
				<div class="section">
					<h3 class="log-tag">{tag.toUpperCase()}</h3>
					{#each entries as entry}
						<div class="log-entry">
							<h4 class="log-header">> {entry.subheader}</h4>
							<p class="log-description">{entry.description}</p>
						</div>
					{/each}
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<div class="project-log">
		<h3 class="empty-state">> select a project to view</h3>
	</div>
{/if}

<style lang="scss">
	@import '../styles/variables.scss';

	.project-log {
		height: var(--panel-height);
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: $color-ember transparent;
		
		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
		
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		
		&::-webkit-scrollbar-thumb {
			background: $color-ember;
			border-radius: 2px;
		}
		
		&::-webkit-scrollbar-button {
			display: none;
		}
		
		border: $border;
		animation: shimmer 6s ease-in-out infinite;
		border-radius: $radius;
		padding: clamp(0.75rem, 1.5vw, 1rem);
		font-family: $font-family;

		color: $color-mossy;
	}

	.project-title {
		white-space: nowrap;
		width: 100%;
		margin: 0;
		font-size: 1.5rem;
		display: block;
		
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: thin;
		scrollbar-color: $color-moonlight transparent;
		max-width: 100%;
		padding-bottom: 0.25rem;
		
		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
		
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		
		&::-webkit-scrollbar-thumb {
			background: $color-moonlight;
			border-radius: 2px;
		}
		
		&::-webkit-scrollbar-button {
			display: none;
		}
	}

	.project-tags {
		color: $color-moonlight;
		display: block;
		line-height: 1.35;
		white-space: nowrap;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		overflow-x: hidden;
		overflow-y: hidden;
		height: auto;
		max-width: 100%;
	}

	.section {
		margin-top: 1.25rem;
		border-top: 2px dotted $color-ember;
	}

	.log-entry {
		margin-bottom: 1rem;
		line-height: 1.75;
	}

	.log-tag {
		color: $color-ember;
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.log-header {
		color: $color-twilight;
		margin-bottom: 0.2rem;
		margin-top: 0;
		font-size: 0.9rem;
	}

	.log-description {
		color: $color-mossy;
		margin-top: 0;
		font-size: 0.7rem;
	}

	.empty-state {
		color: $color-mossy;
		font-size: 1rem;
		font-weight: normal;
		margin: 0;
	}

	@media (max-width: 1200px) {
		.project-log {
			height: auto;
			min-height: 40vh;
		}
	}

	@media (max-width: 768px) {
		.project-log {
			min-height: 35vh;
		}
	}

</style>
