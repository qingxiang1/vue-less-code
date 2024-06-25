/** * @description: 画板预览页面，内嵌入 iframe */

<template>
  <div class="preview-container">
    <div class="component-list-container">
      <div id="preview-component-list" class="component-list">
        <div id="component-list-placeholder" class="component-item-placeholder">
          占位符
        </div>
        <!-- <draggable
          :list="state.components"
          :force-fallback="true"
          :delay="1"
          :fallbackTolerance="3"
          ghost-class="ghost-class"
          drag-class="drag-class"
        > -->
        <div
          v-for="item in state.components"
          :key="item._id"
          class="component-list-item"
          @click.stop="selectComponent(item._id, true)"
        >
          <div class="component-item-tips"></div>
          <div class="component-item-wrapper">
            <component :is="item.componentName" :data="item" />
          </div>
          <div
            v-if="state.currentComponentId === item._id"
            class="component-selected-box"
          />
        </div>
        <!-- </draggable> -->
      </div>
    </div>
  </div>
</template>

<script>
import TitleText from "@/components/common-views/title-text/index.vue";
import { VueDraggableNext } from "vue-draggable-next";
import { setObjAttr, getUuid } from "@/utils/utils";
import { addPageOperation, findLasted } from "@/db";

/**
 * VueDraggableNext 参数
 *
 * drag-class：拖拽组件的样式
 * ghost-class：拖拽占位符的样式
 * delay：鼠标按下后多久可以拖拽，主要针对部分安卓机
 * fallbackTolerance：拖拽之前应该移动的 px 值，一般针对 ios
 */
export default {
  components: {
    TitleText,
    Draggable: VueDraggableNext,
  },
};
</script>

<script setup>
import { ref, onMounted, toRaw } from "vue";
import { useRoute } from "vue-router";
import state from "@/stores/page-editor";
import { getUuid } from "@/utils/utils";

let parent = null;
const dragItem = ref(null);
const dragMoveIndex = ref(-1);
let componentListBound;
const route = useRoute();

/**
 * 创建组件
 * @param data
 */
function onCreateComponent(data) {
  state.components.push(data);
}

/**
 * 选中组件
 * @param id
 */
function selectComponent(id, isSendMsg) {
  state.currentComponentId = id;

  if (parent && isSendMsg) {
    parent.postMessage({
      message: "onSelectComponent",
      data: { _id: id },
    });
  }
}

/**
 * 更新 config 配置
 * @param element object
 */
function onUpdateConfig(element) {
  for (let item of state.components) {
    if (item._id === state.currentComponentId) {
      // item.settings[element.key] = element.value;
      setObjAttr(item.settings, element.key, element.value);
      break;
    }
  }
}

/**
 * 判断是否在 list 容器内，在容器内返回纵向偏移量
 * @param x
 * @param y
 * @param bound
 */
function isInPreviewComponentList(x, y, bound) {
  let clientX = x - bound.x;
  clientX = clientX > bound.width ? -1 : clientX;
  let clientY = y - bound.y;
  clientY = clientY > bound.height ? -1 : clientY;

  if (clientX > 0 && clientY > 0) {
    return clientY;
  }
  return -1;
}

/**
 * 显示占位符
 * @param y
 */
function showPlaceholder(y) {
  const placeholderDom = document.getElementById("component-list-placeholder");
  const componentList = document.getElementsByClassName("component-list-item");
  const componentListParent = document.getElementById("preview-component-list");
  const componentListParentBound = componentListParent.getBoundingClientRect();

  if (componentList.length) {
    for (let i = 0; i < componentList.length; i++) {
      const ele = componentList[i];
      let eleBound = ele.getBoundingClientRect();

      let eleStartY = eleBound.top - componentListParentBound.top;
      let eleHalfY = eleBound.top - componentListParentBound.top + eleBound.height / 2;
      let eleEndY = eleBound.top - componentListParentBound.top + eleBound.height;

      if (y > eleStartY && y < eleHalfY) {
        componentListParent.insertBefore(placeholderDom, ele);
        dragMoveIndex.value = i;
        break;
      } else if (y > eleHalfY && y < eleEndY) {
        if (i === componentList.length - 1) {
          componentListParent.insertAdjacentElement("beforeend", placeholderDom);
        } else {
          componentListParent.insertBefore(placeholderDom, componentList[i + 1]);
        }
        dragMoveIndex.value = i + 1;
        break;
      }
    }
  } else {
    dragMoveIndex.value = 0;
  }
  placeholderDom.style.display = "flex";
}

function hidePlaceholder() {
  const placeholderDom = document.getElementById("component-list-placeholder");
  placeholderDom.style.display = "none";
}

/**
 * 开始拖拽
 * @param data
 */
function dragStart(data) {
  dragItem.value = data;
  const componentListDom = document.getElementById("preview-component-list");
  componentListBound = componentListDom && componentListDom.getBoundingClientRect();
}

/**
 * 拖拽中
 * @param param0
 */
function dragMove({ x, y }) {
  let clientY = isInPreviewComponentList(x, y, componentListBound);

  if (clientY > 0) {
    showPlaceholder(clientY);
  } else {
    dragMoveIndex.value = -1;
    hidePlaceholder();
  }
}

/**
 * 拖拽结束
 */
async function dragEnd() {
  hidePlaceholder();

  if (dragMoveIndex.value > -1) {
    const newComponent = Object.assign(
      {},
      {
        ...dragItem.value.componentSchema,
        _id: getUuid(2),
      }
    );

    if (
      state.components.length === 0 ||
      state.components.length === dragMoveIndex.value
    ) {
      state.components.push(newComponent);
    } else {
      state.components.splice(dragMoveIndex.value, 0, newComponent);
    }

    selectComponent(newComponent["_id"]);
    // 记录操作
    await recordOperation();
    if (parent) {
      parent.postMessage({
        message: "onSyncData",
        data: newComponent["_id"],
      });
    }
  }
}

async function onSyncData() {
  const rowData = await findLasted(route.params.id);
  if (rowData?.components?.length) {
    state.components = rowData.components;
  } else {
    state.components = [];
  }
}

async function recordOperation() {
  try {
    const rowData = await findLasted(route.params.id);
    let step = 0;
    if (rowData?.step) step = rowData.step;
    step++;

    const components = JSON.parse(JSON.stringify(toRaw(state.components)));

    await addPageOperation(route.params.id, step, components);
  } catch (error) {
    console.log("error :", error);
  }
}

onMounted(() => {
  window.addEventListener("message", (event) => {
    parent = event.source;

    if (event.data) {
      const { message, data } = event.data;
      if (message && message !== "init") {
        // 初始化不处理
        switch (message) {
          case "onCreateComponent":
            onCreateComponent(data);
            break;

          case "onUpdateConfig":
            onUpdateConfig(data);
            break;

          case "onDragStart":
            dragStart(data);
            break;

          case "onDragMove":
            dragMove(data);
            break;

          case "onDragEnd":
            dragEnd(data);
            break;

          case "onSyncData":
            onSyncData(data);
            break;
        }
      }
    }
  });
});
</script>

<style lang="less" scoped>
.preview-container {
  display: flex;
  justify-content: center;
  min-width: 200px;
  padding: 10px;
}

.component-list-container {
  position: relative;
  // margin-top: 16px;
  width: 100%;
  max-width: 750px;
}

.component-list {
  // width: 750px;
  width: 100%;
  min-height: 800px;
  border: 1px solid @border-color;
  background-color: @white;
}

.component-item-wrapper {
  cursor: pointer;
}

.component-selected-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid @primary-color;
  cursor: move;
}

.ghost-class {
  width: 100%;
  height: 30px;
  border: 1px dashed @primary-color;
}

.drag-class {
  width: 100%;
  height: 30px;
  border: 1px solid @border-color;
}

.component-item-placeholder {
  display: none;
  width: 100%;
  height: 30px;
  border: 1px dashed @primary-color;
  background-color: rgba(21, 91, 212, 0.1);
  justify-content: center;
  align-items: center;
}
</style>
