<template>
  <div class="editor-content-basic">
    <editor-content-tools />
    <editor-content-preview />
    <editor-content-config />
  </div>
</template>

<script setup>
import EditorContentTools from "../editor-content-tools/index.vue";
import EditorContentPreview from "../editor-content-preview/index.vue";
import EditorContentConfig from "../editor-content-config/index.vue";
</script>

<style lang="less" scoped>
.editor-content-basic {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
