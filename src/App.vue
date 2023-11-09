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
    <el-menu-item index="1">Просмотр</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Выбор камеры</template>
      <el-menu-item
        v-for="item of cpNavigationItems"
        :key="item.id"
        :index="item.id"
        >{{ item.name }}</el-menu-item
      >
      <el-menu-item index="add-camera"><div>
        <span class="mr-1">Добавить новую камеру</span>
        <el-icon><CirclePlus /></el-icon>
      </div></el-menu-item>
    </el-sub-menu>
  </el-menu>
  <AddCamera v-model="centerDialogVisible" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "./main";

const store = useStore();

///// COMPUTED FROM STORE ////
const cpNavigationItems = computed(() => store.getters["navigation/items"]);

//// VARIABLES ////
const activeIndex = ref("1");
const centerDialogVisible = ref(false)

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  if (key === 'add-camera') {
    centerDialogVisible.value = true;
  }
};

</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
