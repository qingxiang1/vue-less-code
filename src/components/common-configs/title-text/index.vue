<template>
  <div class="config-container">
    <div class="config-item">
      <input
        :value="data.content"
        :style="`font-size: ${fontSize}`"
        @change="(e) => handleChange('content', e)"
        class="config-item-input"
      />
    </div>
    <div class="config-item-row">
      <div class="config-item-label">字号：</div>
      <button-group
        :value="fontSize"
        :options="options"
        :changeValue="(e) => handleChange('style.fontSize', e)"
      >
      </button-group>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onUpdated } from "vue";
import ButtonGroup from "components/common-design/button-group/index.vue";

const props = defineProps(["data", "change"]);

let size = props?.data?.style?.fontSize ?? "14px";
const fontSize = ref(size);

onUpdated(() => {
  size = props?.data?.style?.fontSize ?? "14px";
  fontSize.value = size;
});

const options = [
  {
    label: "小",
    value: "12px",
  },
  {
    label: "中",
    value: "14px",
  },
  {
    label: "大",
    value: "16px",
  },
];

/**
 * 改变属性值
 * @param size
 */
function handleChange(key, event) {
  const value = event?.target?.value ?? event;
  fontSize.value = value;
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

.config-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.config-item-label {
  width: 80px;
  text-align: right;
  font-weight: 600;
}
</style>
