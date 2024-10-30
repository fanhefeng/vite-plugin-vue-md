import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// app.config.compilerOptions = {
// 	isCustomElement: (tag) => tag === "my-component", // 自定义组件
// };

app.config.errorHandler = (err) => {
	/* handle error */
	console.log("【错误】", err);
};
app.config.warnHandler = (msg, vm, trace) => {
	/* warn for debugging purposes */
	console.log("【警告】", msg, vm, trace);
};

app.config.globalProperties.$fhf = "fhf"; // 全局变量
app.config.globalProperties.$fhfMethod = () => {
	/* do something */
	console.log("fhfMethod");
};
app.mount("#app");
