<template>
  <div v-html="svgContent" class="svg-design-icon" />
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const svgContent = ref("");

const props = defineProps({
  src: "",
});

onMounted(async () => {
  const response = await fetch(props.src);
  const data = await response.text();
  svgContent.value = data;
});
</script>

<style lang="less" scoped>
.svg-design-icon /deep/ svg {
  width: 32px;
  height: 32px;
}
</style>
