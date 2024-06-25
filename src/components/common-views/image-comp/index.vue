/** * @description: 图片组件 */

<template>
  <div class="image">
    <img v-if="data?.settings?.content" :src="data.settings.content" />
    <div v-else>图片</div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["data"]);
const _style = ref(props?.data?.settings?.style);
</script>

<style lang="less" scoped>
.image {
  padding: 4px 10px;
  width: 100%;
  min-height: 46px;
  user-select: none; // 禁止选中文字
  display: flex;
  align-items: center;
}
</style>
