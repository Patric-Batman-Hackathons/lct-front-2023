<template>
  <el-dialog v-model="value" title="Добавить камеру" width="30%" align-center>
    <el-form
      label-position="top"
      label-width="100px"
      :model="payload"
      style="max-width: 460px"
    >
      <el-form-item label="Название камеры">
        <el-input v-model="payload.name" />
      </el-form-item>
      <el-form-item label="IP адрес">
        <el-input v-model="payload.ip" />
      </el-form-item>
      <el-form-item label="Логин">
        <el-input v-model="payload.login" />
      </el-form-item>
      <el-form-item label="Пароль">
        <el-input v-model="payload.password" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Отмена</el-button>
        <el-button type="primary" @click="addCamera()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useStore } from "../main";

const store = useStore();

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

//// METHODS ////
function closeDialog() {
  value.value = false;
}

function addCamera() {
  store.dispatch("navigation/addCameraStream", payload);
  closeDialog();
}

//// VARIABLES ////
const payload = reactive({
  name: "",
  ip: "",
  login: "",
  password: "",
});
</script>
