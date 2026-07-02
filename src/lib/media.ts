type MediaType = 'youtube' | 'vimeo' | 'steam' | 'itch' | 'image' | 'slides' | 'link'

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif)$/i;

export function classifyMedia(url: string): MediaType {
	try {
		const u = new URL(url);
		const host = u.hostname.replace(/^www\./, '');

		if (IMAGE_EXT.test(u.pathname)) return 'image';

		// YouTube
		if (
			host === 'youtube.com' ||
			host === 'm.youtube.com' ||
			host === 'youtu.be' ||
			host === 'music.youtube.com'
		) return 'youtube';

		// Vimeo
		if (host === 'vimeo.com' || host === 'player.vimeo.com') return 'vimeo';

		// Steam
		if (host === 'store.steampowered.com') return 'steam';

		// itch.io
		if (host.endsWith('.itch.io')) return 'itch';

		// Google Slides
		if (host === 'docs.google.com' && (u.pathname.includes('/presentation/') || u.pathname.includes('/presentation/d/e/'))) return 'slides';

		return 'link';
	} catch {
		return IMAGE_EXT.test(url) ? 'image' : 'link';
	}
}

// YouTube
export function toYouTubeEmbed(url: string): string | null {
	try {
		const u = new URL(url);
		const host = u.hostname.replace(/^www\./, '');

		// youtu.be/<id>
		if (host === 'youtu.be') {
			const id = u.pathname.slice(1);
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}

		// youtube.com
		if (host.endsWith('youtube.com')) {
			// /shorts/<id>
			const shorts = u.pathname.match(/^\/shorts\/([^/]+)/);
			if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`;

			// /watch?v=<id>
			const id = u.searchParams.get('v');
			if (id) return `https://www.youtube.com/embed/${id}`;
		}
		return null;
	} catch {
		return null;
	}
}

// Vimeo
export function toVimeoEmbed(url: string): string | null {
	try {
		const u = new URL(url);
		const host = u.hostname.replace(/^www\./, '');

		if (host === 'player.vimeo.com') {
			const match = u.pathname.match(/^\/video\/(\d+)/);
			return match?.[1] ? `https://player.vimeo.com/video/${match[1]}` : null;
		}

		if (host === 'vimeo.com') {
			const id = u.pathname.split('/').filter(Boolean).find((part) => /^\d+$/.test(part));
			return id ? `https://player.vimeo.com/video/${id}` : null;
		}

		return null;
	} catch {
		return null;
	}
}

// Steam
export function getSteamAppId(url: string): string | null {
	try {
		const u = new URL(url);
		const parts = u.pathname.split('/').filter(Boolean);
		const appIdx = parts.findIndex(p => p === 'app');
		if (appIdx !== -1 && parts[appIdx + 1]) {
			const id = parts[appIdx + 1].match(/^\d+$/)?.[0];
			return id ?? null;
		}
		return null;
	} catch {
		return null;
	}
}

// itch.io
export function getItchParts(url: string): { user: string; project: string } | null {
	try {
		const u = new URL(url);
		const host = u.hostname.replace(/^www\./, '');
		if (!host.endsWith('.itch.io')) return null;
		const user = host.split('.itch.io')[0];
		const project = u.pathname.split('/').filter(Boolean)[0] ?? '';
		if (!user || !project) return null;
		return { user, project };
	} catch {
		return null;
	}
}

// Google Slides
export function toSlidesEmbed(url: string): string | null {
	try {
		const u = new URL(url);
		if (u.hostname !== 'docs.google.com') return null;
		
		// Handle published embed URLs (e.g., /presentation/d/e/2PACX-.../embed)
		if (u.pathname.includes('/presentation/d/e/') && u.pathname.includes('embed')) {
			return url; // Already in embed format
		}
		
		// Handle published URLs (e.g., /presentation/d/e/2PACX-.../pubembed)
		if (u.pathname.includes('/presentation/d/e/') && u.pathname.includes('pubembed')) {
			return url; // Already in embed format
		}
		
		// Handle regular presentation URLs
		if (u.pathname.includes('/presentation/')) {
			const match = u.pathname.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
			if (!match?.[1]) return null;
			
			const presentationId = match[1];
			return `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000`;
		}
		
		return null;
	} catch {
		return null;
	}
}
