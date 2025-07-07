import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [vue(), tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        define: {
            "__API_KEY__": env.API_KEY)
        }
    };
});
