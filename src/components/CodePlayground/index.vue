<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import CodePlayground from './libs/index'

const props = defineProps<{
  url: string
}>()

const container = ref<HTMLDivElement>()
let controller: AbortController| undefined
let iEditor: CodePlayground|undefined


function updateCode (url: string) {
  axios({
    url
  }).then(function (res) {
    if(!iEditor) {
      iEditor = new CodePlayground(container.value!)
    }
    iEditor.setCode(res.data).updateHtml()
  })
}

watch(function () {
  return props.url
}, function () {
  controller?.abort()
  if(props.url) {
    updateCode(props.url)
  }
}, {
  immediate: true
})

function reRunCode () {
  iEditor?.updateHtml()
}

defineExpose({
  reRunCode
})
</script>

<template>
  <div class="code-playground-container" ref="container"></div>
</template>

<style lang="scss">
.code-playground-container {
  display: flex;
  align-items: stretch;

  .code-playground-input {
    width: 700px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  iframe{
    padding: 0;
    margin: 0;
    flex: 1;
    box-sizing: border-box;
    border: none;
  }
}
</style>
