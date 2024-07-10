/** * @description: 画板左侧工具库渲染组件 */

<template>
  <div class="editor-content-tools">
    <div class="content-tools-inner">
      <template v-for="item of toolList" :key="item.title">
        <div
          class="tools-inner-card"
          draggable="true"
          @click="handleCreateComponent(item)"
          @dragstart="handleDragStart($event, item)"
          @dragend="handleDragEnd($event)"
          @drag="handleDrag($event)"
        >
          <svg-design :src="item.icon" />
          <span>{{ item.title }}</span>
          <span> {{ state.countComponent[item.componentName] || 0 }} / {{ item.limit }} </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import _ from 'lodash';
  import state from '@/stores/page-editor';
  import SvgDesign from '@/components/common-design/svg-design/index.vue';

  let offsetBounds = null;

  const toolList = [
    {
      icon: '/public/images/text.svg',
      title: '标题文本',
      limit: 10,
      componentName: 'TitleText',
      componentSchema: {
        name: '标题文本',
        componentName: 'TitleText',
        configName: 'TitleTextConfig',
        value: '文本内容',
        settings: {
          content: '文本内容',
          style: {
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
          },
        },
      },
    },
    {
      icon: '/public/images/picture.svg',
      title: '图片',
      limit: 10,
      componentName: 'Image',
      componentSchema: {
        name: '图片',
        componentName: 'Image',
        configName: 'ImageConfig',
        value: '文本内容',
        settings: {
          content: '', // 图片 url
          style: {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
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

    const cloneObj = _.cloneDeep(tool);

    // 提交到事件中心
    _EE_.emit('createComponent', {
      tool: cloneObj,
    });
  };

  /**
   * 拖拽开始事件
   */
  function handleDragStart(event, item) {
    const iframeDom = document.getElementById('editor-content-preview');

    offsetBounds = iframeDom && iframeDom.getBoundingClientRect();

    _EE_.emit('sendDragAndDropToIframe', {
      message: 'onDragStart',
      data: {
        ...item,
      },
    });
  }

  /**
   * 拖拽事件
   * @param event
   * @param item
   */
  const handleDrag = _.debounce(
    event => {
      if (offsetBounds && offsetBounds.width && offsetBounds.height) {
        // 边界范围判断
        let iframeClientX = event.clientX;
        iframeClientX = iframeClientX > offsetBounds.width ? -1 : iframeClientX;

        let iframeClientY = event.clientY;
        iframeClientY = iframeClientY > offsetBounds.height ? -1 : iframeClientY;

        if (iframeClientX > 0 && iframeClientY > 0) {
          _EE_.emit('sendDragAndDropToIframe', {
            message: 'onDragMove',
            data: {
              x: iframeClientX,
              y: iframeClientY,
            },
          });
        }
      }
    },
    300,
    { leading: true, trailing: false, maxWait: 300 }
  );

  /**
   * 拖拽结束事件
   */
  function handleDragEnd(event) {
    // if (offsetBounds && offsetBounds.width && offsetBounds.height) {
    //   // 边界范围判断
    //   let iframeClientX = event.clientX;
    //   iframeClientX = iframeClientX > offsetBounds.width ? -1 : iframeClientX;

    //   let iframeClientY = event.clientY;
    //   iframeClientY = iframeClientY > offsetBounds.height ? -1 : iframeClientY;

    //   if (iframeClientX > 0 && iframeClientY > 0) {
    //     _EE_.emit("sendDragAndDropToIframe", {
    //       message: "onDragEnd",
    //       data: null,
    //     });
    //   }
    // }
    _EE_.emit('sendDragAndDropToIframe', {
      message: 'onDragEnd',
      data: null,
    });
  }
</script>

<style lang="less" scoped>
  .editor-content-tools {
    width: 200px;
    height: 100%;
    padding: 10px;
    border-right: 1px solid @border-color;
    background-color: @white;
  }

  .content-tools-inner {
    display: flex;
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
    border-radius: @border-radius-2;
    user-select: none; // 禁止文字选中
    &:hover {
      background-color: @primary-color;
      color: @white;
      // /deep/ svg path
      :deep(svg path) {
        fill: @white !important;
      }
    }
  }

  .tools-inner-card-icon {
    width: 32px;
    height: 32px;
  }
</style>
