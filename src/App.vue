<script setup lang="ts">
import CodePlayground from '@/components/CodePlayground/index.vue'
import { ref } from 'vue';
import serverURL from './request/libs/serverURL';

interface FileItem {
  id: string,
  label: string,
  url: string
}


const editorComponent = ref<typeof CodePlayground>()
const htmlList: FileItem[] = [
  {
    id: '1',
    label: '红色页面',
    url: serverURL('@local', '/static/pages/red.html')
  },
  {
    id: '2',
    label: '第二个页面',
    url: serverURL('@local', '/static/pages/test.html')
  }
]

const activeItem = ref<FileItem>(htmlList[0])

function toSelectFile (item: FileItem) {
  activeItem.value = item
}

function runCode () {
  editorComponent?.value?.reRunCode()
}
</script>

<template>
  <div class="code-app">
    <div class="header">
      <div class="btn-run" @click="runCode">运行</div>
    </div>
    <div class="col2">
      <ul>
        <li
          v-for="item in htmlList"
          :key="item.id"
          @click="toSelectFile(item)"
          :class="{'is-active': item.id === activeItem?.id}"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <template v-if="activeItem?.url">
        <CodePlayground ref="editorComponent" class="demo-code-editor" :url="activeItem.url" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-app{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;

  .col2 {
    display: flex;
  align-items: stretch;
  flex: 1;
  }

  .header {
    height: 50px;
    background-color: #444;
    border-bottom: #000 solid 1px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 40px;
    .btn-run {
      font-size: 14px;
      background-color: #3a8b42;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
    }
  }
  ul {
    padding: 10px 0;
    margin: 0;
    list-style: none;
    background-color: #444;
    li {
      width: 200px;
      color: white;
      font-size: 16px;
      padding: 10px 20px;
      box-sizing: border-box;
      cursor: pointer;
      transition: 0.15s;
      &:hover {
        background-color: #6c6c6c;
      }
      &.is-active {
        background-color: yellow;
        color: black;
      }
    }
  }

  .demo-code-editor {
    flex: 1;
  }
}
</style>
