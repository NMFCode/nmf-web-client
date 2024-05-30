import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        commonjsOptions: { include: [/nmf-glsp-client/, /\@eclipse-glsp\/client/] },
    },
    optimizeDeps: {
        include: ['nmf-glsp-client', '@eclipse-glsp/client'],
        esbuildOptions: {
            tsconfig: 'tsconfig.json'
        }
    }
})
