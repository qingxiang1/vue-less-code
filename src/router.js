import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "page_list",
      component: () => import("./pages/editor/page-list.vue"),
    },
    {
      path: "/edit/:id",
      name: "page_edit",
      component: () => import("./pages/editor/page-editor.vue"),
    },
    {
      path: "/edit/preview/:id",
      name: "page_editor_preview",
      component: () => import("./pages/preview/page-editor-preview.vue"),
    },
  ],
});

export default router;