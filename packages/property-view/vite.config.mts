import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../nmeta-vscode/dist',
        assetsDir: 'property-view',
        rollupOptions: {
            output: {
                entryFileNames: 'property.js',
                assetFileNames: 'property.css',
            }
        },
        sourcemap: true,
    },
    test: {
        environment: 'jsdom',
        coverage: {
            include: ['src/**'],
            exclude: ['src/main.tsx'],
        },
    },
});
