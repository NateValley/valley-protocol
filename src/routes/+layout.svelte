<script lang="ts">
	
	import '../styles/main.scss';
	import { navItems } from '$lib/stores';
	import { base } from '$app/paths';
	
	import { page } from '$app/stores';

	import { onDestroy, onMount } from 'svelte';

	let currentPath = '';
	const unsubscribe = page.subscribe(($page) => {
		currentPath = $page.url.pathname;
	});
	onDestroy(() => unsubscribe());

	const profilePhotos = [
		{
			src: `${base}/media/about/profile-1.jpg`,
			caption: 'quick palico pic!'
		},
		{
			src: `${base}/media/about/profile-2.jpg`,
			caption: 'restarting multiplayer in pawfee bean!'
		},
		{
			src: `${base}/media/about/profile-3.jpg`,
			caption: 'graduated and touched grass!'
		}
	];

	let missingProfilePhotos: string[] = [];
	let activeSnapshotIndex = 0;
	let snapshotFading = false;
	let snapshotFrame: HTMLDivElement | undefined;
	let snapshotHeight: number | undefined;

	$: visibleProfilePhotos = profilePhotos.filter((photo) => !missingProfilePhotos.includes(photo.src));
	$: activeSnapshot = visibleProfilePhotos[activeSnapshotIndex % Math.max(visibleProfilePhotos.length, 1)];
	$: if (activeSnapshotIndex >= visibleProfilePhotos.length && visibleProfilePhotos.length > 0) {
		activeSnapshotIndex = 0;
	}

	onMount(() => {
		let fadeTimer: ReturnType<typeof setTimeout> | undefined;
		const snapshotTimer = setInterval(() => {
			if (visibleProfilePhotos.length > 1) {
				snapshotFading = true;
				fadeTimer = setTimeout(() => {
					activeSnapshotIndex = (activeSnapshotIndex + 1) % visibleProfilePhotos.length;
					snapshotFading = false;
					updateSnapshotHeight();
				}, 240);
			}
		}, 4000);

		updateSnapshotHeight();
		window.addEventListener('resize', updateSnapshotHeight);

		return () => {
			clearInterval(snapshotTimer);
			window.removeEventListener('resize', updateSnapshotHeight);
			if (fadeTimer) {
				clearTimeout(fadeTimer);
			}
		};
	});

	function updateSnapshotHeight() {
		requestAnimationFrame(() => {
			const snapshot = snapshotFrame?.querySelector('.snapshot');

			if (snapshot instanceof HTMLElement) {
				snapshotHeight = snapshot.offsetHeight;
			}
		});
	}

	function handleProfilePhotoError(photo: string) {
		if (!missingProfilePhotos.includes(photo)) {
			missingProfilePhotos = [...missingProfilePhotos, photo];
		}
	}

</script>

<main>
	<header class="valley-header">
		<h2>> valley protocol<span class="blinker">_</span></h2>
		<p>crafted by nathaniel berl valdenor :] gameplay systems and custom tools development</p>
	</header>

	<div class="layout">
		<div class="sidebar-stuff">
			<!-- nav stuff (left nav) -->
			<h2 class="sidebar-header">NAVIGATION</h2>
			<nav class="nav-stuff">
				{#each navItems as item}
					<a href={item.href} class:active={currentPath === item.href}>
						<span class="caret">{'>'}</span> 
						{item.label}
						{#if currentPath === item.href}
							<span class="blinker">_</span>
						{/if}
					</a>
				{/each}
			</nav>

			<section class="nav-extra-group" aria-label="route tools">
				{#if currentPath === '/valley-protocol/'}
					<h3 class="nav-extra-header">PROJECT ARCHIVES</h3>
					<div class="nav-extra">
					<div class="nav-extra-actions">
						<a href="https://github.com/NateValley" target="_blank" rel="noreferrer">[ github ]</a>
						<a href="https://natevalley.itch.io" target="_blank" rel="noreferrer">[ itch.io ]</a>
					</div>
					</div>
				{:else if currentPath === '/valley-protocol/about'}
					<h3 class="nav-extra-header">SNAPSHOTS</h3>
					<div class="nav-extra">
					<div
						class="profile-slideshow"
						bind:this={snapshotFrame}
						style:height={snapshotHeight ? `${snapshotHeight}px` : undefined}
						aria-label="profile photo slideshow"
					>
						{#if activeSnapshot}
							<figure class="snapshot" class:fading={snapshotFading} aria-live="polite">
								<img
									src={activeSnapshot.src}
									alt="Nathaniel Valdenor"
									onload={updateSnapshotHeight}
									onerror={() => handleProfilePhotoError(activeSnapshot.src)}
								/>
								<figcaption>{activeSnapshot.caption}</figcaption>
							</figure>
						{:else}
							<div class="slideshow-empty">
								<span>profile photos</span>
							</div>
						{/if}
					</div>
					</div>
				{:else if currentPath === '/valley-protocol/resume'}
					<h3 class="nav-extra-header">RESUME FILE</h3>
					<div class="nav-extra">
					<a class="nav-extra-download" href="/valley-protocol/resume.pdf" target="_blank" rel="noreferrer">
						[ download resume.pdf ]
					</a>
					<p class="nav-extra-label">updated: june 2026</p>
					</div>
				{:else if currentPath === '/valley-protocol/contact'}
					<h3 class="nav-extra-header">MESSAGE CHECKLIST</h3>
					<div class="nav-extra">
					<div class="checklist-category">
						<h4>include:</h4>
					<ul class="message-checklist">
						<li>role / project</li>
						<li>timeline</li>
						<li>relevant links</li>
					</ul>
					</div>
					</div>
				{/if}
			</section>
		</div>

		<div class="route-content">
			<slot /> <!-- page content here -->
		</div>
	</div>
</main>
