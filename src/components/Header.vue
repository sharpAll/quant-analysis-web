<template>
  <div class="header">
    <div class="title">量化工具</div>
    <ul class="menu-box">
      <li class="menu-item" @click="go('/home')">首页</li>
      <li class="menu-item" @click="go('/stock/cn')">A 股</li>
      <li class="menu-item" @click="go('/stock/us')">美 股</li>
    </ul>
  </div>
  <TabsView />
</template>
<script setup lang="ts">
import TabsView from "./TagsView.vue";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";
import { useTabsViewStore } from "/@/store/tabsView";

const dialog = useDialog();
const router = useRouter();
const go = (url: string) => {
  router.push(url);
};
const tabsViewStore = useTabsViewStore();
</script>
<style scoped lang="scss">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
  background: linear-gradient(to top right, #0b365e, #091b2b);
  display: flex;
  .title {
    width: 350px;
    line-height: 50px;
    margin-left: 10px;
    flex: 0 1 auto;
    .logo {
      display: inline-block;
      margin-right: 10px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      vertical-align: -7px;
      background: url("/@/assets/img/dc.png") center no-repeat;
      background-size: cover;
    }
  }
  .menu-box {
    flex: 1 0 auto;
    font-size: 20px;
    .menu-item {
      display: inline-block;
      list-style: none;
      width: 120px;
      height: 47px;
      line-height: 47px;
      text-align: center;
      position: relative;
      cursor: pointer;
      &::after {
        content: "";
        width: 0;
        display: block;
        height: 3px;
        margin: 0 auto;
        background-color: $primary-color;
        border-radius: 2px;
      }
      &:hover::after {
        transition: 0.12s width ease-in;
        width: 100%;
      }
    }
  }
  .tool-box {
    padding-right: 10px;
    .user-box {
      display: flex;
      align-items: center;
      height: 100%;
      cursor: pointer;
      .user-icon {
        margin-right: 6px;
      }
      .name {
        font-size: 16px;
      }
    }
  }
}
</style>
