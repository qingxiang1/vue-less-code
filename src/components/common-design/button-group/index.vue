<template>
  <div class="btn-group-box">
    <span
      class="btn-group-item"
      :class="{ 'selected-item': current === item?.value }"
      v-for="item in props.options"
      :key="item.value"
      @click="selectOption(item)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, onUpdated, ref } from "vue";

const props = defineProps(["changeValue", "options", "value"]);

const current = ref(props.value);

onUpdated(() => {
  current.value = props?.value ?? "";
});

function selectOption(item) {
  current.value = item?.value;
  if (props.changeValue) {
    props.changeValue(item?.value);
  }
}
</script>

<style lang="less" scoped>
.btn-group-box {
  display: inline-block;
  border-radius: @border-radius-4;
  overflow: hidden;
}

.btn-group-item {
  display: inline-block;
  padding: 1px 10px;
  cursor: pointer;
  border: 1px solid @border-color;
  line-height: 20px;
  &:hover {
    color: @primary-color;
    transition: all 0.3s;
  }
  &:not(:first-child) {
    border-left: none;
  }
  &:first-child {
    border-radius: @border-radius-4 0 0 @border-radius-4;
  }
  &:last-child {
    border-radius: 0 @border-radius-4 @border-radius-4 0;
  }
}

.selected-item {
  background-color: @primary-color;
  color: @white;
  border: 1px solid @primary-color;
  &:hover {
    color: @white !important;
  }
}
</style>
