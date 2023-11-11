//@ts-ignore
import { createStore } from "vuex";

import { App } from "vue";
import navigation from "./modules/navigation";
// import info from './modules/info';

export default (app: App) =>
  createStore<any>({
    modules: {
      navigation: navigation(app),
    },
  });
