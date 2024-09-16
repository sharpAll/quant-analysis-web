import { defineStore } from "pinia";

export interface IAsyncRouteState {
  keepAliveComponents: string[];
}

export const useAsyncRouteStore = defineStore({
  id: "app-async-route",
  state: (): IAsyncRouteState => ({
    keepAliveComponents: [],
  }),
  actions: {
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
  },
});
