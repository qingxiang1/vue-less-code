<template>
  <div class="editor-content-preview">
    <iframe
      :src="`/edit/preview/${$route.params.id}`"
      class="editor-content-preview-iframe"
    />
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.editor-content-preview {
  flex: 1;
  height: 100%;
  padding: 10px;
  background-color: #f7f8fa;
}

.editor-content-preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
