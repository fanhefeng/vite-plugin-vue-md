import { marked } from "marked";
export default (userOptions = { wrapperElement: "div" }) => {
	const { wrapperElement: el } = userOptions;
	return {
		name: "vite-plugin-vue-md",
		/* 在以下操作之前执行
		 * 1. Vite core plugins
		 * 2. User plugins without enforce value
		 * 3. Vite build plugins
		 * 在这些步骤之后执行： enfore: "post"
		 */
		enforce: "pre",
		transform(code, id) {
			if (id.endsWith(".md")) {
				// 将 Markdown 文件转换为 Vue 组件
				const vueCode = `<template><${el}>${marked(code)}</${el}></template>`;
				// const vueCode = `
				//   <template>
				//     <${el} v-html="content"></${el}>
				//   </template>

				//   <script>
				//   export default {
				//     data() {
				//       return {
				//         content: ${marked(code)}
				//       }
				//     }
				//   }
				//   </script>
				// `;
				return {
					code: vueCode,
					map: null, // 如果需要 source map，可以在这里生成
				};
			}
		},
	};
};
