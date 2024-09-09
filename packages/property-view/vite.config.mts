import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        assetsDir: 'property-view'
    },
    test: {
        environment: 'jsdom',
        coverage: {
            include: ['src/**'],
            exclude: ['src/main.tsx'],
        },
    },
});
