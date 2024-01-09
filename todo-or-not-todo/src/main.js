import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";


import App from "./App.vue";
import router from "./router";
import i18n from "./translations/i18n";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-icons/font/bootstrap-icons.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

library.add(faPenToSquare, faTrashCan, faPlus)

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount("#app");
