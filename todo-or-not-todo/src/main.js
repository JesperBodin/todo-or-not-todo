import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import App from "./App.vue";
import router from "./router";
import i18n from "./configuration/i18n";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(BootstrapVue);
app.use(IconsPlugin);

app.mount("#app");
