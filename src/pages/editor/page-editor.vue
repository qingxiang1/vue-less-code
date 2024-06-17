<template>
  <page-editor-header />
  {{ state.components }}
  <page-editor-content />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

import PageEditorHeader from "@/components/editor-header/index.vue";
import PageEditorContent from "@/components/editor-content/index.vue";
import getUuid from "@/utils/getUuid";
import state from "@/stores/page-editor";

const onCreateComponent = (tool) => {
  console.log("create :", tool);
  if (state.countComponent[tool.componentName]) {
    state.countComponent[tool.componentName]++;
  } else {
    state.countComponent[tool.componentName] = 1;
  }

  state.components.push(Object.assign({}, { ...tool.componentSchema, _uuid: getUuid() }));
};

onMounted(() => {
  _EE_.on("createComponent", onCreateComponent); // 事件监听
});

onUnmounted(() => {
  _EE_.removeListener("createComponent"); // 事件销毁
});
</script>
