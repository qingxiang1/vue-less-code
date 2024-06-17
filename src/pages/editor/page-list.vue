<template>
  <div class="page-list-basic">
    <div>Page List</div>
    <template v-for="page in pageList" :key="page.id">
      <div class="fl">
        <div>{{ page.name }}</div>
        <div>2</div>
        <div>
          <router-link :to="`/edit/${page.id}`">编辑</router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const pageList = [
  {
    id: 1,
    name: "test1",
    url: "",
  },
];
</script>

<style lang="less">
.page-list-basic {
  padding: 16px;
}
</style>
