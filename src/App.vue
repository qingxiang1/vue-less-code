<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
  <!-- :key="$route.fullPath" -->
</template>

<script setup>
import { ref } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const locale = ref(zhCn);
</script>

<style>
#root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
