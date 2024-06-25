/** * @description: 标题文本组件 */

<template>
  <div class="title-text" :style="_style">{{ data?.settings?.content }}</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["data"]);
const _style = ref(props?.data?.settings?.style);
</script>

<style lang="less" scoped>
.title-text {
  padding: 4px 10px;
  user-select: none; // 禁止选中文字
  // -ms-user-select: none;
  // -khtml-user-select: none;
  // -webkit-user-select: none;
  // -moz-user-select: none;
}
</style>
