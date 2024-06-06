import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        commonjsOptions: { include: [/<%= language-id %>/, /\@eclipse-glsp\/client/] },
    },
    optimizeDeps: {
        include: ['<%= language-id %>', '@eclipse-glsp/client'],
        esbuildOptions: {
            tsconfig: 'tsconfig.json'
        }
    }
})
