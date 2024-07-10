<template>
  <div class="page-editor-header">
    <div>
      <router-link class="page-editor-back-a" style="" to="/">
        <i class="iconfont icon-left-arrow" style="font-size: 14px; font-weight: 600" />
        <span style="font-size: 14px; font-weight: 600; margin-left: 8px">返回</span>
      </router-link>
    </div>
    <div class="editor-header-btn-group">
      <div class="editor-header-btn" style="margin-right: 8px">预览</div>
      <div class="editor-header-btn" style="margin-right: 8px">保存</div>
      <div class="editor-header-btn primary">发布</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.page-editor-header {
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: @white;
  border-bottom: 1px solid @border-color;
}

.page-editor-back-a {
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
}

.editor-header-btn-group {
  display: flex;
  justify-content: space-around;
}

.editor-header-btn {
  padding: 4px 8px;
  border: 1px solid @border-color;
  border-radius: @border-radius-4;
  cursor: pointer;
  &:hover {
    background-color: @border-color;
  }
}

.editor-header-btn.primary {
  background-color: @primary-color;
  color: @white;
  &:hover {
    background-color: @primary-8;
  }
}
</style>
