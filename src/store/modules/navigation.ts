import { App } from "vue";
import {
  INavigationState,
  ICreateCameraStreamPayload,
} from "../../interfaces/store/navigation";
import { ICameraStream } from "../../interfaces/common";
import { ElMessage } from "element-plus";
import { v4 as uuidv4 } from "uuid";

const createNavigationStore = (app: App) => {
  const state = (): INavigationState => ({
    items: [],
    addCameraDialogOpened: false,
  });

  const getters = {
    items: (state: INavigationState) => {
      return state.items;
    },
    addCameraDialogOpened: (state: INavigationState) => {
      return state.addCameraDialogOpened;
    },
  };

  const mutations = {
    ADD_ITEM: (state: INavigationState, item: ICameraStream) => {
      state.items.push(item);
    },
    REMOVE_ITEM: (state: INavigationState, id: string) => {
      const idx = state.items.findIndex((item) => item.id === id);
      if (idx === -1) {
        return;
      }

      state.items.splice(idx, 1);
    },
    SET_OPENED_CAMERA_DIALOG: (state: INavigationState, payload: boolean) => {
      state.addCameraDialogOpened = payload;
    },
  };

  const actions = {
    async addCameraStream(store: any, payload: ICreateCameraStreamPayload) {
      try {
        const createdStream: ICameraStream = {
          id: uuidv4(),
		  url: '',
          ...payload,
        };

        await store.commit("ADD_ITEM", createdStream);
      } catch (error) {
        ElMessage({
          message: "Что-то пошло не так",
          type: "error",
        });
      }
    },

    async removeCameraStream(store: any, id: number) {
      try {
        await store.commit("REMOVE_ITEM", id);
      } catch (error) {
        ElMessage({
          message: "Что-то пошло не так",
          type: "error",
        });
      }
    },

    async openAddCameraDialog(store: any) {
      try {
        await store.commit("SET_OPENED_CAMERA_DIALOG", true);
      } catch (error) {
        ElMessage({
          message: "Что-то пошло не так",
          type: "error",
        });
      }
    },

    async closeAddCameraDialog(store: any) {
      try {
        await store.commit("SET_OPENED_CAMERA_DIALOG", false);
      } catch (error) {
        ElMessage({
          message: "Что-то пошло не так",
          type: "error",
        });
      }
    },
  };

  return {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
};

export default (app: App) => createNavigationStore(app);
