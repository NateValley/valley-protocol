<script lang="ts">
	import type { Project } from '$lib/projects';
	import { classifyMedia, getSteamAppId, toVimeoEmbed, toYouTubeEmbed, getItchParts, toSlidesEmbed } from '$lib/media';
	import { base } from '$app/paths';

	export let project: Project;

	// simple cache so we don’t refetch on every reactive pass
	let steamCache: Record<string, { ok: boolean; name?: string; header_image?: string; short_description?: string }> = {};

	function steamImageSrc(src?: string) {
		if (!src) return '';

		if (src.startsWith('http://') || src.startsWith('https://')) {
			return src;
		}

		return `${base}${src.startsWith('/') ? src : `/${src}`}`;
	}

	async function loadSteam(appid: string) {
		if (steamCache[appid]) return steamCache[appid];

		try {
			const r = await fetch(`${base}/steam/${appid}.json`);

			if (!r.ok) {
				throw new Error(`Static Steam data not found for appid ${appid}`);
			}

			const j = await r.json();
			steamCache[appid] = j;
			return j;
		} catch (error) {
			console.error('Failed to load static Steam data:', error);

			steamCache[appid] = { ok: false };
			return { ok: false };
		}
	}

	const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

	// Parse header to separate main text from date in parentheses
	function parseHeader(header: string) {
		if (header.includes('(') && header.includes(')')) {
			const parts = header.split(/(\([^)]+\))/);
			const mainText = parts.filter(p => !p.startsWith('(') && p.trim()).join('').trim();
			const dateText = parts.find(p => p.startsWith('(') && p.endsWith(')'));
			return { mainText, dateText };
		}
		return { mainText: header, dateText: null };
	}
</script>

<div class="media-container">
	{#each project.media as m (m.url)}
		{#if classifyMedia(m.url) === 'steam'}
			{@const appId = getSteamAppId(m.url)}
			{#if appId}
				{#await loadSteam(appId) then s}
					{@const headerParts = parseHeader(m.header)}
					<div class="media-item">
					<div class="media-content">
						{#if s.ok}
							<div class="steam-content">
								<img
									src={steamImageSrc(s.header_image)}
									alt={headerParts.mainText}
									class="steam-image"
									loading="lazy"
								/>
								<div class="steam-info">
									{#if s.short_description}
										<p class="steam-description">{s.short_description}</p>
									{/if}
									<div class="steam-links">
										<a href={m.url} target="_blank" rel="noopener noreferrer">View Store Page</a>
									</div>
								</div>
							</div>
						{:else}
							<div class="external-link">
								<a href={m.url} target="_blank" rel="noopener noreferrer">
									View on Steam
								</a>
								<p>Couldn't fetch store metadata</p>
							</div>
						{/if}
					</div>
					<p class="media-caption">
						{headerParts.mainText}{#if headerParts.dateText}
							{` ${headerParts.dateText}`}
						{/if}
					</p>
				</div>
				{/await}
			{:else}
				{@const headerParts = parseHeader(m.header)}
				<div class="media-item">
					<div class="media-content">
						<div class="external-link">
							<a href={m.url} target="_blank" rel="noopener noreferrer">
								View on Steam
							</a>
							<p>Failed to parse Steam App ID</p>
						</div>
					</div>
					<p class="media-caption">
						{headerParts.mainText}{#if headerParts.dateText}
							{` ${headerParts.dateText}`}
						{/if}
					</p>
				</div>
			{/if}

		{:else if classifyMedia(m.url) === 'youtube'}
			<div class="media-item">
				<div class="media-content">
					{#if toYouTubeEmbed(m.url)}
						<iframe 
							src={toYouTubeEmbed(m.url)} 
							title="YouTube video"
							frameborder="0" 
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
							allowfullscreen>
						</iframe>
					{/if}
				</div>
				<p class="media-caption">{m.header}</p>
			</div>

		{:else if classifyMedia(m.url) === 'vimeo'}
			<div class="media-item">
				<div class="media-content">
					{#if toVimeoEmbed(m.url)}
						<iframe
							src={toVimeoEmbed(m.url)}
							title="Vimeo video"
							frameborder="0"
							allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
							allowfullscreen>
						</iframe>
					{/if}
				</div>
				<p class="media-caption">{m.header}</p>
			</div>

		{:else if classifyMedia(m.url) === 'slides'}
			{@const headerParts = parseHeader(m.header)}
			<div class="media-item">
				<div class="media-content slides-content">
					{#if toSlidesEmbed(m.url)}
						<iframe 
							src={toSlidesEmbed(m.url)} 
							title="Google Slides presentation"
							frameborder="0" 
							allowfullscreen>
						</iframe>
					{/if}
				</div>
				<p class="media-caption">
					{headerParts.mainText}{#if headerParts.dateText}
						{` ${headerParts.dateText}`}
					{/if}
				</p>
			</div>

		{:else if classifyMedia(m.url) === 'itch'}
			<div class="media-item">
				<div class="media-content">
					<div class="external-link">
						<a href={m.url} target="_blank" rel="noopener noreferrer" on:click={() => open(m.url)}>
							View on itch.io
						</a>
					</div>
				</div>
				<p class="media-caption">{m.header}</p>
			</div>

		{:else if classifyMedia(m.url) === 'image'}
			{@const headerParts = parseHeader(m.header)}
			<div class="media-item">
				<div class="media-content">
					<img src={m.url.startsWith('/') && !m.url.startsWith('http') ? `${base}${m.url}` : m.url} alt="Project media" loading="lazy" />
				</div>
				<p class="media-caption">
					{headerParts.mainText}{#if headerParts.dateText}
						{` ${headerParts.dateText}`}
					{/if}
				</p>
			</div>

		{:else}
			<div class="media-item">
				<div class="media-content">
					<div class="external-link">
						<a href={m.url} target="_blank" rel="noopener noreferrer" on:click={() => open(m.url)}>
							View externally
						</a>
					</div>
				</div>
				<p class="media-caption">{m.header}</p>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .media-container {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	height: 100%;
	overflow-y: auto;
	align-items: center;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
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
  }

  .media-item {
	width: 100%;
	margin: 0;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 0.35rem;

	.media-caption {
	  color: $color-dusk;
	  font-size: 0.72rem;
	  font-style: italic;
	  line-height: 1.35;
	  margin: 0;
	  white-space: pre-line;

	  &::before {
		content: '> ';
		color: $color-dusk;
	  }
	}

	.media-content {
	  display: flex;
	  justify-content: center;
	  align-items: center;

	  img, video, iframe {
		max-width: 100%;
		border-radius: $radius;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	  }

	  img {
		height: auto;
		object-fit: cover;
	  }

	  video {
		height: auto;
		max-height: 300px;
	  }

	  iframe {
		width: 100%;
		height: 200px;
		border: none;
		
		&[title*="Google Slides"] {
		  width: 480px;
		  height: 299px;
		  max-width: 100%;
		}
	  }

	  &.slides-content {
		width: auto;
		max-width: 100%;
		display: inline-flex;
		justify-content: center;
	  }

	  .external-link {
		background: rgba($color-mossy, 0.1);
		border: 1px solid $color-mossy;
		border-radius: $radius;
		padding: 1rem;
		text-align: center;
		color: $color-mossy;
		width: 100%;

		a {
		  color: $color-moonlight;
		  text-decoration: underline;

		  &:hover {
			color: $color-ember;
		  }
		}

		p {
		  margin-top: 0.5rem;
		  font-size: 0.875rem;
		  opacity: 0.7;
		}
	  }

	  .steam-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: transparent;
		border: 1px solid $color-ember;
		border-radius: $radius;
		padding: 1rem;
		
		.steam-image {
		  width: 100%;
		  height: auto;
		  border-radius: $radius;
		  object-fit: cover;
		  margin-bottom: 1rem;
		}

		.steam-info {
		  .steam-name {
			font-weight: bold;
			color: $color-ember;
			margin: 0 0 0.5rem 0;
			font-size: 1rem;
			text-align: center;
		  }

		  .steam-description {
			color: $color-mossy;
			font-size: 0.875rem;
			line-height: 1.4;
			margin: 0 0 1rem 0;
			text-align: center;
			text-transform: lowercase;

			max-height: 4.9rem;
			overflow-y: auto;
			padding-right: 0.5rem;

			scrollbar-width: thin;
			scrollbar-color: $color-ember transparent;

			&::-webkit-scrollbar {
				width: 4px;
			}

			&::-webkit-scrollbar-track {
				background: transparent;
			}

			&::-webkit-scrollbar-thumb {
				background: $color-ember;
				border-radius: 2px;
			}
		}

		  .steam-links {
			display: flex;
			justify-content: center;
			gap: 1rem;
			flex-wrap: wrap;

			a {
			  color: $color-dusk;
			  text-decoration: underline;
			  font-size: 0.875rem;
			  text-transform: lowercase;

			  &:hover {
				color: $color-moonlight;
				text-shadow: 0 0 5px $color-moonlight;
			  }
			}
		  }
		}
	  }
	}
  }
</style>
