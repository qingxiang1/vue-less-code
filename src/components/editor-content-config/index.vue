/** * @description: 画板编辑页面，组件配置模块 */

<template>
  <div class="editor-content-config">
    <div class="content-config-title">{{ data?.name }}</div>
    <common-config :data="data" v-if="data" />
  </div>
</template>

<script setup>
import CommonConfig from "@/components/common-configs/index.vue";
import { defineProps } from "vue";

const props = defineProps(["data"]);
</script>

<style lang="less" scoped>
.editor-content-config {
  width: 360px;
  height: 100%;
  padding: 10px;
  border-left: 1px solid @border-color;
  background-color: @white;
}

.content-config-title {
  font-size: 18px;
  padding: 10px 14px;
  border-bottom: 1px solid @border-color;
}
</style>
