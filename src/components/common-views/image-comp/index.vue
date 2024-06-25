/** * @description: 图片组件 */

<template>
  <div class="image" :style="_style">图片图片</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["data"]);
const _style = ref(props?.data?.settings?.style);
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  min-height: 46px;
  user-select: none; // 禁止选中文字
}
</style>
