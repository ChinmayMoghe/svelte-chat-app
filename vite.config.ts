import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import {webSocketServerPlugin} from './websocket-vite-plugin';

export default defineConfig({
	plugins: [sveltekit(),webSocketServerPlugin],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
