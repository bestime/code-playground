<script setup lang="ts">
import CodePlayground from '@/components/CodePlayground/index.vue';
import { nextTick, onMounted, ref } from 'vue';
import { NButton, NSelect, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { requestJsonFile } from './request';
import { last } from 'lodash';

interface FileItem {
  id: string;
  label: string;
  baseURL?: RequestHttp.ServerAlias;
  url?: string;
}

const currentTheme = ref('vs');
const activeMenuId = ref('');
const editorComponent = ref<typeof CodePlayground>();
const htmlList = ref<FileItem[]>([]);
const themes = ref<
  {
    label: string;
    value: string;
  }[]
>([]);
const activeItem = ref<FileItem>();

const menuOptions = ref<MenuOption[]>([]);

function runCode() {
  editorComponent?.value?.reRunCode();
}

function onMenuChange(value: string) {
  activeMenuId.value = value;
  const list = bestime.deepFindTreePath(htmlList.value, function (item) {
    return item.id === value;
  });
  activeItem.value = last(list);
}

onMounted(function () {
  Promise.all([
    requestJsonFile('/static/json/theme-list.json'),
    requestJsonFile<FileItem[]>('/static/json/file-list.json'),
  ]).then(function (res) {
    themes.value = res[0];
    htmlList.value = res[1];
    menuOptions.value = bestime.mapTree(res[1], 'children', function (item) {
      return {
        label: item.label,
        key: item.id,
      };
    });

    console.log('menuOptions', menuOptions.value);

    nextTick(function () {
      onMenuChange('2.1');
    });
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
      <NMenu
        v-if="menuOptions.length"
        default-expand-all
        v-model:value="activeMenuId"
        :options="menuOptions"
        accordion
        :indent="15"
        @update-value="onMenuChange"
      />
      <template v-if="activeItem?.url && activeItem.baseURL">
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

  :deep() {
    .n-menu {
      background-color: #f9f9f9;
      width: 200px;
      border-right: #ddd solid 1px;
    }
  }

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
    color: #444;
    margin: 0 10px 0 20px;
  }

  .header {
    height: 50px;
    background-color: #f9f9f9;
    border-bottom: #ddd solid 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    flex-shrink: 0;
  }
  .demo-code-editor {
    flex: 1;
  }
}
</style>
