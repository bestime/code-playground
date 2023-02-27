<script setup lang="ts">
import serverURL from '@/request/libs/serverURL';

const imgUrl = serverURL('@local', '/static/images/01.png?t=4')
</script>

<template>
  <div class="LevelOne">
    <div class="col">
      <div class="imgbox">
        <img src="/static/images/01.png" />
      </div>
      <div class="imgbox">
        <img :src="imgUrl" />
      </div>
      <div class="imgbox cssbg"></div>
    </div>
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
.LevelOne {
  background: green;
  margin: 20px;
  .col {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgbox {
    width: 200px;
    height: 150px;
    margin: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.cssbg {
      background-image: url("/static/images/01.png");
      background-size: 100% 100%;
    }
  }

}
</style>
