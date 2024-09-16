<template>
  <vHeader />
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <transition name="move" mode="out-in">
        <keep-alive :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import vHeader from "./Header.vue";
import { computed } from "vue";
import { useAsyncRouteStore } from "/@/store/asyncRoute";
const asyncRouteStore = useAsyncRouteStore();
const keepAliveComponents = computed(() => {
  return asyncRouteStore.keepAliveComponents;
});
</script>
<style scoped lang="scss">
.content {
  margin: 5px 5px 8px;
  height: calc(100vh - 100px);
}
</style>
