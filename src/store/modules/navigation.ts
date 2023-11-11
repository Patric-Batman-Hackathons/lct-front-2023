import { App } from "vue";
import {
  INavigationState,
  ICreateCameraStreamPayload,
} from "../../interfaces/store/navigation";
import { ICameraStream, IGetStream } from "../../interfaces/common";
import { ElMessage } from "element-plus";
import { v4 as uuidv4 } from "uuid";
import { IMAGES } from "../../mocks";
import { AxiosInstance } from "axios";
import { convertFrontStream, convertStream } from "../../utils/converter";

const createNavigationStore = (app: App) => {
  const axios: AxiosInstance = app.config.globalProperties.axios;

  const state = (): INavigationState => ({
    items: [],
    selectedItem: null,
    addCameraDialogOpened: false,
  });

  const getters = {
    items: (state: INavigationState) => {
      return state.items;
    },
    selectedItem: (state: INavigationState) => {
      return state.selectedItem;
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
    SET_ITEMS: (state: INavigationState, items: ICameraStream[]) => {
      state.items = items;
    },
    REMOVE_ITEMS: (state: INavigationState) => {
      state.items = [];
    },
    SELECT_ITEM: (state: INavigationState, id: string) => {
      const idx = state.items.findIndex((item) => item.id === id);
      if (idx === -1) {
        return;
      }

      state.selectedItem = state.items[idx];
    },
    SELECT_FIRST_ITEM: (state: INavigationState) => {
      if (state.items.length === 0) {
        state.selectedItem = null;
        return;
      }

      state.selectedItem = state.items[0];
    },
    SELECT_LAST_ITEM: (state: INavigationState) => {
      if (state.items.length === 0) {
        state.selectedItem = null;
        return;
      }

      state.selectedItem = state.items[state.items.length - 1];
    },
    SET_OPENED_CAMERA_DIALOG: (state: INavigationState, payload: boolean) => {
      state.addCameraDialogOpened = payload;
    },
  };

  const actions = {
    async addCameraStream(store: any, payload: ICreateCameraStreamPayload) {
      try {
        const randomIndex = Math.floor(Math.random() * IMAGES.length);
        const imageUrl = IMAGES[randomIndex];

        const createdStream: ICameraStream = {
          id: uuidv4(),
          url: imageUrl,
          ...payload,
        };

        await axios.post<any>(
          "stream/post/",
          convertFrontStream(createdStream)
        );

        await store.commit("ADD_ITEM", createdStream);
        await store.commit("SELECT_LAST_ITEM");
      } catch (error) {
        console.error(error);
        ElMessage({
          message: "Что-то пошло не так",
          type: "error",
        });
      }
    },

    async removeCameraStream(store: any, id: string) {
      try {
        await store.commit("REMOVE_ITEM", id);
        await store.commit("SELECT_FIRST_ITEM");
      } catch (error) {
        console.error(error);
        ElMessage({
          message: "Что-то пошло не так",
          type: "error",
        });
      }
    },

    async selectItem(
      store: any,
      payload: {
        id: string;
        onSelected: () => void;
      }
    ) {
      try {
        const { id, onSelected } = payload;
        await axios.post("stream/active/", {
          uid: id,
        });
        await store.commit("SELECT_ITEM", id);

        if (onSelected) {
          onSelected();
        }
      } catch (error) {
        console.error(error);
        ElMessage({
          message: "Не удалось получить изображение",
          type: "error",
        });
      }
    },

    async getStreams(store: any) {
      try {
        const { data: streams } = await axios.get<IGetStream>("stream/get/");
        const mappedStreams: ICameraStream[] = streams.map((item) =>
          convertStream(item)
        );
        await store.commit("SET_ITEMS", mappedStreams);
      } catch (error) {
        console.error(error);
        ElMessage({
          message: "Не удалось получить добавленные камеры",
          type: "error",
        });
      }
    },

    async createScreenshot(store: any) {
      try {
        const selectedItem = store.state.selectedItem;
        if (!selectedItem) {
          ElMessage({
            message: "Сначала выберите камеру",
            type: "warning",
          });
          return;
        }
      } catch (error) {
        console.error(error);
        ElMessage({
          message: "Не удалось сохранить изображение",
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
