import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "virtual:windi.css";
import { installNaiveUI } from "./plugins/naive";
import createRouterGuards from "./router/router-guards";

const app = createApp(App);

installNaiveUI(app);

app.use(router).use(createPinia()).mount("#app");
createRouterGuards(router);
