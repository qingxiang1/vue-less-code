<template>
  <component :is="data.componentName" :data="data.settings" :change="changeProperty" />
</template>

<script>
import TitleText from "./title-text/index.vue";
import Image from "./image-comp/index.vue";

export default {
  components: {
    TitleText,
    Image,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["data"]);

function changeProperty(key, value) {
  _EE_.emit("updateConfig", key, value);
}
</script>

<style lang="less">
.config-item {
  margin: 10px 0;
  min-height: 20px;
}

.config-item-input {
  border: none !important;
  outline: none !important;
  width: 100%;
}
</style>
