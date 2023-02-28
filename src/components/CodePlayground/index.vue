<script setup lang="ts">
import request from '@/request';
import { onUnmounted, ref, watch } from 'vue';
import CodePlayground, { type EditorTheme } from './libs/index';

const props = defineProps<{
  url: string;
  baseURL: RequestHttp.ServerAlias;
}>();

const container = ref<HTMLDivElement>();
let controller: AbortController | undefined;
let iEditor: CodePlayground | undefined;

function updateCode(url: string) {
  controller?.abort();
  controller = new AbortController();
  request({
    baseURL: props.baseURL,
    url,
    controller,
  }).then(function (res: any) {
    if (!iEditor) {
      iEditor = new CodePlayground(container.value!);
    }
    iEditor.setCode(res.data).runCode();
  });
}

watch(
  function () {
    return props.url;
  },
  function () {
    controller?.abort();
    if (props.url) {
      updateCode(props.url);
    }
  },
  {
    immediate: true,
  }
);

function reRunCode() {
  iEditor?.runCode();
}
function setTheme(data: EditorTheme) {
  iEditor?.setTheme(data);
}

onUnmounted(function () {
  iEditor?.dispose();
});

defineExpose({
  reRunCode,
  setTheme,
});
</script>

<template>
  <div class="CodePlayground" ref="container"></div>
</template>

<style lang="scss"></style>
