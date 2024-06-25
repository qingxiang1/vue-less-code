/** * @description: 编辑器中心预览模块 iframe 框架 * */

<template>
  <div class="editor-content-preview">
    <div class="overlay" v-show="overlayVisible"></div>
    <iframe
      id="editor-content-preview"
      :src="`/edit/preview/${$route.params.id}`"
      class="editor-content-preview-iframe"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const overlayVisible = ref(false);
let childIFrame = null;

onMounted(() => {
  childIFrame = document.getElementById("editor-content-preview")?.contentWindow;

  if (childIFrame) {
    setTimeout(() => {
      childIFrame.postMessage({
        message: "init",
        data: null,
      });
    }, 300);
  }

  // 当前 window 接收 iframe 内部传出的消息
  window.addEventListener("message", (event) => {
    if (event.data) {
      _EE_.emit("receivedMessageFromIframe", event.data);
    }
  });

  _EE_.on("sendDragAndDropToIframe", (message) => {
    if (message.message === "onDragStart") {
      overlayVisible.value = true;
    }
    if (message.message === "onDragEnd") {
      overlayVisible.value = false;
    }
    childIFrame.postMessage(message);
  });

  // 监听 sendMessageToIframe 事件，并向 iframe 内部发送消息
  _EE_.on("sendMessageToIframe", (data) => {
    childIFrame.postMessage(data);
  });
});

onUnmounted(() => {
  _EE_.removeListener("sendMessageToIframe");
  _EE_.removeListener("sendDragAndDropToIframe");
});
</script>

<style lang="less" scoped>
.editor-content-preview {
  flex: 1;
  height: 100%;
  // padding: 10px;
  background-color: #f7f8fa;
}

.overlay {
  width: 100%;
  height: 100%;
  border: none !important;
  background-color: transparent !important;
  position: absolute !important;
  left: 0;
  top: 0;
  z-index: 9;
}

.editor-content-preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
