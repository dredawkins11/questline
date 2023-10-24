import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: "/questline",
        plugins: [react()],
        server: {
            proxy: {
                "/quest": {
                    target: process.env.VITE_BACKEND_URI,
                    changeOrigin: true,
                },
            },
        },
    });
};
