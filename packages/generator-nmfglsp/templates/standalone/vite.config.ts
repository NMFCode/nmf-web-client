import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        commonjsOptions: { include: [/<%= language-id %>-glsp-client/, /\@eclipse-glsp\/client/] },
    },
    optimizeDeps: {
        include: ['<%= language-id %>-glsp-client', '@eclipse-glsp/client'],
        esbuildOptions: {
            tsconfig: 'tsconfig.json'
        }
    }
})
