import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 4000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				sourceMapContents: false,
				additionalData(source) {
					let prepends = '';
					prepends += `@use "@/assets/styles/screen" as *;`;
					prepends += source;

					return prepends;
				},
			},
		},
	},
});
