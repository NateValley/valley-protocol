<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { Project } from '$lib/projects';
	import { classifyMedia, getSteamAppId, toVimeoEmbed, toYouTubeEmbed } from '$lib/media';

	export let project: Project | null;
	export let showDetails: () => void;

	let steamCache: Record<string, { ok: boolean; header_image?: string; short_description?: string }> = {};
	let activeMediaIndex = 0;
	let mediaFading = false;
	let previousProject: Project | null = null;

	$: mediaSlides = project ? (project.previewMedia.length > 0 ? project.previewMedia : project.media) : [];
	$: activeMedia = mediaSlides[activeMediaIndex % Math.max(mediaSlides.length, 1)] ?? null;
	$: if (project !== previousProject) {
		previousProject = project;
		activeMediaIndex = 0;
		mediaFading = false;
	}
	$: if (activeMediaIndex >= mediaSlides.length && mediaSlides.length > 0) {
		activeMediaIndex = 0;
	}

	onMount(() => {
		let fadeTimer: ReturnType<typeof setTimeout> | undefined;
		const mediaTimer = setInterval(() => {
			if (mediaSlides.length > 1) {
				mediaFading = true;
				fadeTimer = setTimeout(() => {
					activeMediaIndex = (activeMediaIndex + 1) % mediaSlides.length;
					mediaFading = false;
				}, 240);
			}
		}, 4000);

		return () => {
			clearInterval(mediaTimer);
			if (fadeTimer) clearTimeout(fadeTimer);
		};
	});

	function mediaSrc(url: string) {
		return url.startsWith('/') && !url.startsWith('http') ? `${base}${url}` : url;
	}

	function autoplayYouTubeSrc(url: string) {
		const embedUrl = toYouTubeEmbed(url);
		return embedUrl ? `${embedUrl}?autoplay=1&mute=1&playsinline=1&rel=0` : null;
	}

	function autoplayVimeoSrc(url: string) {
		const embedUrl = toVimeoEmbed(url);
		return embedUrl ? `${embedUrl}?autoplay=1&muted=1&playsinline=1` : null;
	}

	async function loadSteam(appid: string) {
		if (steamCache[appid]) return steamCache[appid];

		try {
			const response = await fetch(`${base}/steam/${appid}.json`);
			if (!response.ok) throw new Error(`Static Steam data not found for appid ${appid}`);

			const data = await response.json();
			steamCache[appid] = data;
			return data;
		} catch (error) {
			console.error('Failed to load intro Steam data:', error);
			steamCache[appid] = { ok: false };
			return steamCache[appid];
		}
	}
</script>

<div class="project-intro">
	{#if project}
		<div class="intro-copy">
			<div class="intro-heading">
				<h1 class="intro-title">{project.title.toUpperCase()}</h1>

				<p class="intro-tags">{project.tags.join(', ').toUpperCase()}</p>
			</div>

			<div class="intro-body">
				<section class="fact-row">
					<h3>summary</h3>
					<p>{project.summary}</p>
				</section>

				<section class="fact-row">
					<h3>role</h3>
					<p>{project.role}</p>
				</section>

				<section class="fact-row">
					<h3>built with</h3>
					<p>{project.builtWith}</p>
				</section>

				<section class="fact-row">
					<h3>team</h3>
					<p>{project.team}</p>
				</section>
			</div>
		</div>

		<figure class="intro-media" aria-label={`${project.title} media preview`}>
			<div class="media-snapshot" class:fading={mediaFading} aria-live="polite">
				{#if activeMedia}
					{@const mediaType = classifyMedia(activeMedia.url)}
					{#if mediaType === 'image'}
						<img src={mediaSrc(activeMedia.url)} alt={`${project.title} preview`} />
					{:else if mediaType === 'steam' && getSteamAppId(activeMedia.url)}
						{@const appId = getSteamAppId(activeMedia.url)}
						{#await loadSteam(appId ?? '') then steam}
							{#if steam.ok && steam.header_image}
								<img src={mediaSrc(steam.header_image)} alt={`${project.title} Steam preview`} />
							{:else}
								<div class="media-link">> media preview unavailable</div>
							{/if}
						{/await}
					{:else if mediaType === 'youtube' && autoplayYouTubeSrc(activeMedia.url)}
						<iframe
							src={autoplayYouTubeSrc(activeMedia.url)}
							title={`${project.title} preview video`}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>
					{:else if mediaType === 'vimeo' && autoplayVimeoSrc(activeMedia.url)}
						<iframe
							src={autoplayVimeoSrc(activeMedia.url)}
							title={`${project.title} preview video`}
							frameborder="0"
							allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
							allowfullscreen
						></iframe>
					{:else}
						<div class="media-link">
							<a href={activeMedia.url} target="_blank" rel="noopener noreferrer">> view preview media</a>
						</div>
					{/if}
				{:else}
					<div class="media-link">> no media preview found</div>
				{/if}
			</div>
			<figcaption>
				{activeMedia?.header ?? 'project breakdown only'}
			</figcaption>
		</figure>

		<div class="intro-actions">
			<button class="details-button" type="button" onclick={showDetails}>
				[ open project details ]
			</button>

			{#each project.links as link}
				<a class="details-button project-link-button" href={link.url} target="_blank" rel="noopener noreferrer">
					[ {link.label} ]
				</a>
			{/each}
		</div>
	{:else}
		<div class="intro-empty">
			<h3>> select a project to view</h3>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../styles/variables.scss';

	.project-intro {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) auto;
		gap: 1rem;
		height: calc(var(--panel-height) * 0.667);
		overflow: hidden;
		border: $border;
		border-radius: $radius;
		animation: shimmer 6s ease-in-out infinite, intro-enter 0.28s ease;
		padding: clamp(0.75rem, 1.5vw, 1rem);
		font-family: $font-family;
		color: $color-mossy;
		transition:
			min-height 0.32s ease,
			padding $transition;
	}

	.intro-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 1rem;
		min-width: 0;
		min-height: 0;
		height: 100%;
	}

	.intro-heading {
		display: grid;
		gap: 0.5rem;
		width: 100%;
	}

	.intro-title {
		margin: 0;
		color: $color-mossy;
		font-size: 1.5rem;
		line-height: 1.15;
		overflow-wrap: anywhere;
		text-align: left;
	}

	.details-button {
		display: block;
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
		white-space: nowrap;
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

	}

	.intro-actions {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: 0.75rem;
		justify-content: center;
		width: 100%;
	}

	.intro-media {
		display: grid;
		grid-template-rows: auto auto;
		gap: 0.5rem;
		min-height: 0;
		min-width: 0;
		margin: 0;
		width: 100%;
		align-self: start;
		justify-self: end;
		height: auto;
	}

	.intro-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		min-width: 0;
		width: 100%;
	}

	.fact-row {
		display: grid;
		gap: 0.25rem;
		width: 100%;

		h3 {
			color: $color-twilight;
			font-size: 0.9rem;
			line-height: 1.35;
			margin: 0;
			text-align: left;
			text-transform: lowercase;
		}

		h3::before {
			content: '> ';
			color: $color-twilight;
		}

		p {
			color: $color-mossy;
			font-size: 0.75rem;
			line-height: 1.45;
			margin: 0;
			text-align: left;
		}
	}

	.project-link-button {
		white-space: nowrap;
	}

	.intro-media img,
	.intro-media iframe,
	.media-link {
		width: 100%;
		border: 1px solid rgba($color-ember, 0.55);
		border-radius: $radius;
		background: rgba($color-evergreen, 0.35);
	}

	.media-snapshot {
		min-height: 0;
		height: auto;
		animation: snapshot-enter 0.35s ease;
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 0.24s ease,
			transform 0.24s ease;

		&.fading {
			opacity: 0;
			transform: translateY(0.1rem);
		}
	}

	.intro-media img {
		height: auto;
		max-height: 22rem;
		min-height: 0;
		object-fit: contain;
	}

	.intro-media iframe {
		aspect-ratio: 16 / 9;
		height: auto;
		max-height: 22rem;
		min-height: 0;
		object-fit: contain;
	}

	.media-link {
		display: grid;
		min-height: 12rem;
		place-items: center;
		padding: 1rem;
		text-align: center;
		color: $color-mossy;

		a {
			color: $color-moonlight;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				color: $color-ember;
				outline: none;
			}
		}
	}

	figcaption {
		color: $color-dusk;
		font-size: 0.75rem;
		font-style: italic;
		line-height: 1.35;
		text-align: center;
		white-space: pre-line;
	}

	.intro-tags {
		width: 100%;
		align-self: center;
		color: $color-moonlight;
		font-size: 0.78rem;
		line-height: 1.45;
		margin: 0;
		text-align: left;
	}

	.intro-empty {
		grid-column: 1 / -1;
		color: $color-mossy;
		font-size: 1rem;

		h3 {
			margin: 0;
			font-size: 1rem;
			font-weight: normal;
		}
	}

	@keyframes snapshot-enter {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes intro-enter {
		from {
			opacity: 0;
			transform: translateY(0.25rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 1200px) {
		.project-intro {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			height: auto;
		}

		.intro-media {
			min-height: 16rem;
		}
	}

	@media (max-width: 768px) {
		.details-button {
			font-size: clamp(0.62rem, 3.2vw, 0.8rem);
			padding-inline: clamp(0.45rem, 2.5vw, 0.7rem);
		}
	}
</style>
