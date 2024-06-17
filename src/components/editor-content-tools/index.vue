<template>
  <div class="editor-content-tools">
    <div class="content-tools-inner">
      <template v-for="item of toolList" :key="item.title">
        <div class="tools-inner-card" @click="handleCreateComponent(item)">
          <svg-design :src="item.icon" />
          <span>{{ item.title }}</span>
          <span>
            {{ state.countComponent[item.componentName] || 0 }} / {{ item.limit }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import state from "@/stores/page-editor";
import SvgDesign from "@/components/common-design/svg-design/index.vue";

const toolList = [
  {
    icon: "/public/images/text.svg",
    title: "标题文本",
    limit: 10,
    componentName: "TitleText",
    componentSchema: {
      name: "标题文本",
      componentName: "TitleText",
      configName: "TitleTextConfig",
      value: "文本内容",
      settings: {
        content: "文本内容",
        styles: {
          "text-align": "left",
          "font-size": "14px",
          "font-weight": "600",
          color: "#333",
        },
      },
    },
  },
];

/**
 * 点击 tool 生成组件
 * @param tool
 */
const handleCreateComponent = (tool = {}) => {
  const count = state.countComponent[tool.componentName] || 0;
  if (count === tool.limit) return false;

  // 提交到事件中心
  _EE_.emit("createComponent", tool);
};
</script>

<style lang="less" scoped>
.editor-content-tools {
  width: 200px;
  height: 100%;
  padding: 10px;
  border-right: 1px solid #eee;
}

.tools-inner-card {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 2px;
  &:hover {
    background-color: #155bd4;
    color: #fff;
    /deep/ svg path {
      fill: #fff !important;
    }
  }
}

.tools-inner-card-icon {
  width: 32px;
  height: 32px;
}
</style>
