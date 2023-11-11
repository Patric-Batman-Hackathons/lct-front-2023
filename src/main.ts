import { createApp } from "vue";
import App from "./App.vue";

// ELEMENT PLUS //
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ROUTER //
import router from "./routes";

// TAILWIND CSS //
import "./index.css";

// VUEX //
import createStore from "./store";

// AXIOS //
import VueAxios from 'vue-axios';
import axiosInstance from './plugins/axios';
import { AxiosStatic } from 'axios';

// COMPONENTS //
import AddCamera from "./components/AddCamera.vue";

const app = createApp(App);

//@ts-ignore
app.config.devtools = true;

app.use(VueAxios, axiosInstance as AxiosStatic);
app.provide('axios', app.config.globalProperties.axios);

app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

export const store = createStore(app);
export function useStore() {
    return store;
}
console.log(store);
app.use(store);

app.component('AddCamera', AddCamera);

app.mount("#app");
