<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/projects';

	import { selectedProject, tags } from '$lib/stores';
	
	import ProjectCard from '$lib/ProjectCard.svelte';
	import TagToggle from '$lib/TagToggle.svelte';
    import ProjectLog from '$lib/ProjectLog.svelte';
	import ProjectMedia from '$lib/ProjectMedia.svelte';
	import ProjectIntro from '$lib/ProjectIntro.svelte';
	import type { Project } from '$lib/projects';

	let activeTags: string[] = [];
	let detailsOpen = false;
	let previousProject: Project | null = null;
	

	function toggleTag(tag: string) {
		activeTags = activeTags.includes(tag)
			? activeTags.filter(t => t !== tag)
			: [...activeTags, tag];
	}

	function selectProjectOffset(offset: number) {
		if (filteredProjects.length === 0) return;

		const currentIndex = filteredProjects.findIndex((project) => project === $selectedProject);
		const safeIndex = currentIndex === -1 ? 0 : currentIndex;
		const nextIndex = (safeIndex + offset + filteredProjects.length) % filteredProjects.length;
		const nextProject = filteredProjects[nextIndex];

		selectedProject.set(nextProject);
	}

	$: filteredProjects = activeTags.length === 0
		? projects
		: projects.filter(p =>
			activeTags.every(t =>
				p.tags.some(tag => tag.toLowerCase() === t.toLowerCase())
			)
		);

	$: if ($selectedProject !== previousProject) {
		previousProject = $selectedProject;
		detailsOpen = false;
	}

	onMount(() => {
		selectedProject.set(projects[0] ?? null);
	});
</script>


	<!-- project list + filters (middle) -->
<div>
	<div class="portfolio-grid" class:details-open={detailsOpen}>

		<div class="project-list-pane">
			<h2 class="panel-header">PROJECT LIST</h2>
			<div class="filters-cards-column">
				<div class="project-filters">
					<h3 class="filters-header">project filters</h3>
					<div class="tags">
						{#each tags as tag}
							<TagToggle
								{tag}
								isActive={activeTags.includes(tag)}
								toggle={toggleTag}
							/>
						{/each}
					</div>
				</div>
		
				<div class="projects-group">
					<div class="project-list">
						{#if filteredProjects.length > 0}
							{#each filteredProjects as project}
								<ProjectCard
									title={project.title}
									projectData={project}
								/>
							{/each}
						{:else}
							<p>> no matching projects !</p>
						{/if}
					</div>
				</div>	
			</div>
		</div>

		{#if detailsOpen}
			<!-- project logs (middle) -->
			<div class="project-log-pane details-pane">
				<h2 class="panel-header">SELECTED PROJECT</h2>
				<ProjectLog />
				<button
					class="project-navigation-button desktop-project-navigation"
					type="button"
					onclick={() => selectProjectOffset(-1)}
					disabled={filteredProjects.length <= 1}
				>
					[ &lt;&lt; previous ]
				</button>
			</div>

			<div class="project-media-pane details-pane">
				<h2 class="panel-header">PROJECT MEDIA</h2>
				<div class="project-media">
					<div class="project-media-content">
						{#if $selectedProject && $selectedProject.media.length > 0}
							<ProjectMedia project={$selectedProject} />
						{:else}
							{#if $selectedProject}
								<div class="no-media-section">
									<h3 class="log-tag">> NO MEDIA FOUND :[</h3>
								</div>
						{:else}
							<div class="no-media">
								<h3 class="empty-state">> select a project to view</h3>
							</div>
						{/if}
					{/if}
					</div>
				</div>
				<button
					class="project-navigation-button desktop-project-navigation"
					type="button"
					onclick={() => selectProjectOffset(1)}
					disabled={filteredProjects.length <= 1}
				>
					[ next &gt;&gt; ]
				</button>
			</div>

			<div class="mobile-project-navigation">
				<button
					class="project-navigation-button"
					type="button"
					onclick={() => selectProjectOffset(-1)}
					disabled={filteredProjects.length <= 1}
				>
					[ &lt;&lt; previous ]
				</button>

				<button
					class="project-navigation-button"
					type="button"
					onclick={() => selectProjectOffset(1)}
					disabled={filteredProjects.length <= 1}
				>
					[ next &gt;&gt; ]
				</button>
			</div>
		{:else}
			<div class="project-intro-pane">
				<h2 class="panel-header">SELECTED PROJECT</h2>
				<ProjectIntro
					project={$selectedProject}
					showDetails={() => (detailsOpen = true)}
				/>
				<div class="intro-project-navigation">
					<button
						class="project-navigation-button"
						type="button"
						onclick={() => selectProjectOffset(-1)}
						disabled={filteredProjects.length <= 1}
					>
						[ &lt;&lt; previous ]
					</button>

					<button
						class="project-navigation-button"
						type="button"
						onclick={() => selectProjectOffset(1)}
						disabled={filteredProjects.length <= 1}
					>
						[ next &gt;&gt; ]
					</button>
				</div>
			</div>
		{/if}

	</div>
</div>

<style lang="scss">
	@import '../styles/variables.scss';

	.project-media {
		.no-media {
			color: $color-mossy;
			font-family: $font-family;
			
			.empty-state {
				color: $color-mossy;
				font-size: 1rem;
				font-weight: normal;
				margin: 0;
			}
		}
	}

	.filters-header {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: $color-twilight;
		font-size: 0.9rem;
		font-weight: bold;
		line-height: 1.35;
		text-transform: lowercase;
	}

	.filters-header::before {
		content: '> ';
		color: $color-twilight;
	}

	.log-tag {
		color: $color-ember;
	}

	.no-media-section {
		margin-top: 1rem;
		padding-top: 0.5rem;
	}

	.project-intro-pane {
		grid-column: 2 / 4;
		min-width: 0;
		animation: pane-enter 0.28s ease;
	}

	.project-navigation-button {
		display: block;
		margin-top: 0.75rem;
		width: 100%;
		border: 1px solid rgba($color-ember, 0.65);
		border-radius: calc($radius / 2);
		background: transparent;
		color: $color-ember;
		cursor: pointer;
		font-family: $font-family;
		font-size: 0.8rem;
		font-weight: bold;
		line-height: 1.35;
		padding: 0.45rem 0.7rem;
		text-align: center;
		text-decoration: none;
		transition:
			border-color $transition,
			color $transition,
			text-shadow $transition;

		&:hover,
		&:focus-visible {
			border-color: $color-moonlight;
			color: $color-moonlight;
			outline: none;
			text-shadow: 0 0 5px rgba($color-moonlight, 0.5);
		}

		&:disabled {
			border-color: rgba($color-dusk, 0.35);
			color: rgba($color-dusk, 0.55);
			cursor: default;
			text-shadow: none;
		}
	}

	.details-pane {
		--project-navigation-gap: 0.75rem;
		--project-navigation-height: 2.35rem;
		animation: pane-enter 0.28s ease;

		:global(.project-log),
		:global(.project-media) {
			height: calc(var(--panel-height) - var(--project-navigation-height) - var(--project-navigation-gap));
		}
	}

	.mobile-project-navigation {
		display: none;
	}

	.intro-project-navigation {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		margin-top: 0.75rem;
		width: 100%;
	}

	.intro-project-navigation .project-navigation-button {
		margin-top: 0;
		min-width: 0;
	}

	@keyframes pane-enter {
		from {
			opacity: 0;
			transform: translateY(0.2rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 1200px) {
		.project-intro-pane {
			grid-column: auto;
		}

		.details-pane {
			:global(.project-log),
			:global(.project-media) {
				height: auto;
			}
		}

		.desktop-project-navigation {
			display: none;
		}

		.mobile-project-navigation {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.75rem;
			width: 100%;
		}

		.mobile-project-navigation .project-navigation-button {
			margin-top: 0;
			min-width: 0;
		}
	}

</style>
