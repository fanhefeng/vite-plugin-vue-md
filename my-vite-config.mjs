import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import md from "./src/plugins/vite-plugin-vue-md";

export default defineConfig({
	base: "/", // 设置项目的基础路径
	build: {
		outDir: "dist",
		assetsDir: "assets",
		sourcemap: true,
		// 使用 terser 压缩代码
		minify: "terser",
		terserOptions: {
			compress: {
				// 移除 console.log 和 debugger 语句
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			// 如果有外部依赖不需要打包，可以在这里配置，不会被打包进 bundle 中
			external: ["vue"],
			output: {
				// 设置全局变量，用于UMD格式输出
				globals: {
					vue: "Vue",
				},
			},
			input: {
				main: "src/main.js",
			},
		},
	},
	server: {
		port: 9999,
		open: true,
	},
	css: {
		preprocessorOptions: {
			// 用于预处理器的额外数据配置
			// 自动导入全局样式变量
			// scss: {
			// 	additionalData: `@import "@/assets/scss/variables.scss";`,
			// },
		},
	},
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/], // 支持vue和md文件
		}),
		md({
			wrapperElement: "section",
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
