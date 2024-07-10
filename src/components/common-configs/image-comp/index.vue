<template>
  <div class="config-container">
    <img v-if="data?.settings?.content" :src="data.settings.content" />
    <div v-else>图片</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["data", "change"]);

/**
 * 改变属性值
 * @param size
 */
function handleChange(key, event) {
  const value = event?.target?.value ?? event;
  if (props.change) {
    props.change(key, value);
  }
}
</script>

<style lang="less" scope>
.config-container {
  width: 100%;
  padding: 10px;
  border-top: 1px solid @border-color;
}
</style>
