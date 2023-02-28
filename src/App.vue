<script setup lang="ts">
import CodePlayground from '@/components/CodePlayground/index.vue';
import { onMounted, ref } from 'vue';
import { NButton, NSelect } from 'naive-ui';
import { requestJsonFile } from './request';

interface FileItem {
  id: string;
  label: string;
  baseURL: RequestHttp.ServerAlias;
  url: string;
}

const currentTheme = ref('vs-dark');
const editorComponent = ref<typeof CodePlayground>();
const htmlList = ref<FileItem[]>([]);
const themes = ref<
  {
    label: string;
    value: string;
  }[]
>([]);
const activeItem = ref<FileItem>();

function toSelectFile(item: FileItem) {
  activeItem.value = item;
}

function runCode() {
  editorComponent?.value?.reRunCode();
}

onMounted(function () {
  Promise.all([
    requestJsonFile('/static/json/theme-list.json'),
    requestJsonFile<FileItem[]>('/static/json/file-list.json'),
  ]).then(function (res) {
    themes.value = res[0];
    htmlList.value = res[1];
    if (htmlList.value.length) {
      activeItem.value = htmlList.value[0];
    }
  });
});

function onThemeChange(value: string) {
  editorComponent?.value?.setTheme(value);
}
</script>

<template>
  <div class="code-app">
    <div class="header">
      <div class="htop">
        <span class="section-prefix">主题</span>
        <NSelect
          @update-value="onThemeChange"
          style="width: 120px"
          v-model:value="currentTheme"
          :options="themes"
        ></NSelect>
      </div>
      <NButton @click="runCode" type="primary" style="margin-left: 10px">运行代码</NButton>
    </div>
    <div class="col2">
      <ul>
        <li
          v-for="item in htmlList"
          :key="item.id"
          @click="toSelectFile(item)"
          :class="{ 'is-active': item.id === activeItem?.id }"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <template v-if="activeItem?.url">
        <CodePlayground
          :baseURL="activeItem.baseURL"
          ref="editorComponent"
          class="demo-code-editor"
          :url="activeItem.url"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-app {
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
    height: 0;
  }

  .htop {
    display: flex;
    align-items: center;
  }

  .section-prefix {
    font-size: 14px;
    color: white;
    margin: 0 10px 0 20px;
  }

  .header {
    height: 50px;
    background-color: #444;
    border-bottom: #000 solid 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    flex-shrink: 0;
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
        background-color: #18a058;
        color: white;
      }
    }
  }

  .demo-code-editor {
    flex: 1;
  }
}
</style>
