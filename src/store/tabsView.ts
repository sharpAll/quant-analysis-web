import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";
import { Storage } from "/@/utils/storage";
import { userEnum } from "/@/enums/userEnum";
import { WhiteList } from "/@/enums/pageEnum";
export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

// 保留固定路由
function retainAffixRoute(list: any[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

export const useTabsViewStore = defineStore({
  id: "app-tabs-view",
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes: RouteItem[]) {
      // 初始化标签页
      this.tabsList = routes;
    },
    addTabs(route: RouteItem): boolean {
      // 添加标签页
      if (WhiteList.includes(route.name)) {
        return false;
      }
      const isExists = this.tabsList.some(
        (item) => item.fullPath === route.fullPath
      );
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(route: RouteItem) {
      // 关闭左侧
      const index = this.tabsList.findIndex(
        (item) => item.fullPath === route.fullPath
      );
      this.tabsList = this.tabsList.filter(
        (item, i) => i >= index || (item?.meta?.affix ?? false)
      );
    },
    closeRightTabs(route: RouteItem) {
      // 关闭右侧
      const index = this.tabsList.findIndex(
        (item) => item.fullPath === route.fullPath
      );
      this.tabsList = this.tabsList.filter(
        (item, i) => i <= index || (item?.meta?.affix ?? false)
      );
    },
    closeOtherTabs(route: RouteItem) {
      // 关闭其他
      this.tabsList = this.tabsList.filter(
        (item) =>
          item.fullPath === route.fullPath || (item?.meta?.affix ?? false)
      );
    },
    closeCurrentTab(route: RouteItem) {
      // 关闭当前页
      const index = this.tabsList.findIndex(
        (item) => item.fullPath === route.fullPath
      );
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // 关闭全部
      this.tabsList = retainAffixRoute(this.tabsList);
    },
    saveCurrentTabs() {
      Storage.set(userEnum.TABS_ROUTES, JSON.stringify(this.tabsList));
    },
    clearCurrentTabs() {
      Storage.remove(userEnum.TABS_ROUTES);
    },
  },
});
