import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react(),
    ],
    // alias: {
    //     "@":" path.resolve(__dirname, 'src')"
    // },
    resolve: {
        alias: [
            { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
            { find: '@helpers', replacement: path.resolve(__dirname, 'src/helpers') },
        ],
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'dcs-react-hooks',
            formats: ['es', 'umd'],
            fileName: (format) => `dcs-react-hooks.${format}.js`,
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React'
                },
            },
        },
    },
});