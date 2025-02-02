import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        commonjsOptions: { include: [/nmeta-glsp-client/, /@eclipse-glsp\/client/] },
    },
    optimizeDeps: {
        include: ['nmeta-glsp-client', '@eclipse-glsp/client'],
        esbuildOptions: {
            tsconfig: 'tsconfig.json'
        }
    }
})
