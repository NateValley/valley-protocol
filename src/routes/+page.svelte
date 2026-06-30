<script lang="ts">
	import { projects } from '$lib/projects';

	import { selectedProject, tags } from '$lib/stores';
	
	import ProjectCard from '$lib/ProjectCard.svelte';
	import TagToggle from '$lib/TagToggle.svelte';
    import ProjectLog from '$lib/ProjectLog.svelte';
	import ProjectMedia from '$lib/ProjectMedia.svelte';

	let activeTags: string[] = [];
	

	function toggleTag(tag: string) {
		activeTags = activeTags.includes(tag)
			? activeTags.filter(t => t !== tag)
			: [...activeTags, tag];
	}

	$: filteredProjects = activeTags.length === 0
		? projects
		: projects.filter(p =>
			activeTags.every(t =>
				p.tags.some(tag => tag.toLowerCase() === t.toLowerCase())
			)
		);
</script>


	<!-- project list + filters (middle) -->
<div>
	<div class="portfolio-grid">

		<div class="project-list-pane">
			<h2 class="panel-header">PROJECT LIST</h2>
			<div class="filters-cards-column">
				<div class="project-filters">
					<h3 class="filters-header">project filters:</h3>
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
									tags={project.tags}
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

		<!-- project logs (middle) -->
		<div class="project-log-pane">
			<h2 class="panel-header">SELECTED PROJECT</h2>
			<ProjectLog />
		</div>

		<div class="project-media-pane">
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
		</div>

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
		font-weight: bold;
	}

	.section {
		margin-top: 1rem;
		padding-top: 0.5rem;
		border-top: 2px dotted $color-ember;
	}

	.log-tag {
		color: $color-ember;
	}

	.no-media-section {
		margin-top: 1rem;
		padding-top: 0.5rem;
	}
</style>
