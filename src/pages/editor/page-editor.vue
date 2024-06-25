<template>
  <page-editor-header />
  <div class="editor-content-basic">
    <editor-content-tools />
    <editor-content-preview />
    <editor-content-config :data="currentComponent" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, toRaw } from "vue";
import { useRoute } from "vue-router";

import PageEditorHeader from "@/components/editor-header/index.vue";
// import PageEditorContent from "@/components/editor-content/index.vue";
import EditorContentTools from "@/components/editor-content-tools/index.vue";
import EditorContentPreview from "@/components/editor-content-preview/index.vue";
import EditorContentConfig from "@/components/editor-content-config/index.vue";
import { getUuid, setObjAttr } from "@/utils/utils";
import state from "@/stores/page-editor";
import { addPageOperation, findLasted } from "@/db";

const currentComponent = ref(null);
const route = useRoute();

/**
 * 创建组件
 * @param tool
 * @param index 创建的位置
 */
const createComponent = async ({ tool, index }) => {
  if (state.countComponent[tool.componentName]) {
    state.countComponent[tool.componentName]++;
  } else {
    state.countComponent[tool.componentName] = 1;
  }

  const newObj = Object.assign({}, { ...tool.componentSchema, _id: getUuid(2) });
  if (!index && index !== 0) {
    state.components.push(newObj);
  } else {
    state.components.splice(index, 0, newObj);
  }

  // 记录操作
  await recordOperation();

  // 事件发送
  // _EE_.emit("sendMessageToIframe", { message: "onCreateComponent", data: newObj });
  _EE_.emit("sendMessageToIframe", { message: "onSyncData", data: null });
};

async function onSyncData(id) {
  const rowData = await findLasted(route.params.id);
  if (rowData?.components?.length) {
    state.components = rowData.components;
    if (id) onSelectComponent(id);
  } else {
    state.components = [];
  }
}

async function recordOperation() {
  const rowData = await findLasted(route.params.id);
  let step = 0;
  if (rowData?.step) step = rowData.step;
  step++;

  await addPageOperation(route.params.id, step, toRaw(state.components));
}

/**
 * 更新 config
 */
const updateConfig = (key, value) => {
  for (const item of state.components) {
    if (item._id === state.currentComponentId) {
      setObjAttr(item.settings, key, value);
      // item.settings[key] = value;
      currentComponent.value = item;

      break;
    }
  }

  _EE_.emit("sendMessageToIframe", {
    message: "onUpdateConfig",
    data: { key, value },
  });
};

/**
 * 选中某个组件
 * @param id
 */
function onSelectComponent(id) {
  state.currentComponentId = id;

  console.log("111 >>> :", id, toRaw(state.components));

  for (const item of state.components) {
    if (item._id === id) {
      currentComponent.value = item;
      break;
    }
  }
}

/**
 * 选中组件
 * @param object
 */
const onReceivedMessageFromIframe = ({ message, data }) => {
  if (message && message !== "init") {
    switch (message) {
      case "onSelectComponent":
        onSelectComponent(data._id);
        break;

      case "onSyncData":
        onSyncData(data);
        break;
    }
  }
};

onMounted(() => {
  // 统一事件监听
  _EE_.on("createComponent", createComponent); // 事件监听
  _EE_.on("updateConfig", updateConfig);
  _EE_.on("receivedMessageFromIframe", onReceivedMessageFromIframe);
});

onUnmounted(() => {
  _EE_.removeListener("createComponent"); // 事件销毁
  // _EE_.removeListener("updateConfig"); // 事件销毁
  // _EE_.removeListener("receivedMessageFromIframe"); // 事件销毁
});
</script>

<style lang="less" scoped>
.editor-content-basic {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
