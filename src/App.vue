<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      menu-trigger="click"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img style="width: 20px" src="vite.svg" alt="Element logo" />
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="screenshot" v-if="selectedItem"
        >Сделать снимок</el-menu-item
      >
      <el-menu-item index="screenshot">Просмотр</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Выбор камеры</template>
        <el-menu-item
          v-for="item of cpNavigationItems"
          :key="item.id"
          :index="item.id"
          ><div class="flex justify-between w-full h-9 gap-2">
            <span>{{ item.name }}</span>
            <div class="flex justify-center items-center h-full">
              <el-icon @click="removeItem(item.id)"><Minus /></el-icon>
            </div></div
        ></el-menu-item>
        <el-menu-item index="add-camera"
          ><div class="flex justify-between w-full h-9 gap-2">
            <span class="mr-1">Добавить новую камеру</span>
            <div class="flex justify-center items-center h-full">
              <el-icon><Plus /></el-icon>
            </div></div
        ></el-menu-item>
      </el-sub-menu>
    </el-menu>

    <!-- Main page -->
    <div v-if="selectedItem">
      <div class="flex justify-center items-center px-20 py-16">
        <img
          :src="selectedItem.url"
          ref="cameraSrc"
          alt="Изображение"
          class="w-full rounded-lg"
        />
      </div>
    </div>
    <!-- Poppers -->
    <AddCamera v-model="centerDialogVisible" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { computed, onMounted } from "vue";
import { useStore } from "./main";

const store = useStore();

///// COMPUTED FROM STORE ////
const cpNavigationItems = computed(() => store.getters["navigation/items"]);
const selectedItem = computed(() => store.getters["navigation/selectedItem"]);

//// VARIABLES ////
const activeIndex = ref("1");
const centerDialogVisible = ref(false);

//// REFS ////
const cameraSrc = ref<HTMLImageElement | null>(null);

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  if (key === "add-camera") {
    centerDialogVisible.value = true;
    return;
  }

  store.dispatch("navigation/selectItem", {
    id: key,
    onSelected: onSelected,
  });

};

function onSelected() {
  console.log('onSelect');
  if (!cameraSrc.value) {
    console.warn('Camera not loaded yet');
    return;
  }

  cameraSrc.value.onload = () => {
    console.log('Loaded');
  }
}

function removeItem(id: string) {
  store.dispatch("navigation/removeCameraStream", id);
}

onMounted(() => {
  store.dispatch("navigation/getStreams");
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
