import { Router, useRouter } from "vue-router";
import { useAsyncRouteStore } from "/@/store/asyncRoute";
import { WhiteList, PageEnum } from "/@/enums/pageEnum";
import { useTabsViewStore } from "/@/store/tabsView";
import router from "/@/router";

export default function createRouterGuards(router: Router) {
  const asyncRouteStore = useAsyncRouteStore();
  router.afterEach((to) => {
    document.title = `量化工具|${to?.meta?.title}`;
    // 在这里设置需要缓存的组件名称
    const currentComName: any = to.matched.find(
      (item) => item.name === to.name
    )?.name;
    const tabsViewStore = useTabsViewStore();
    const keepAliveComponentsTemp: string[] = [];
    for (let i = 0; i < tabsViewStore.tabsList.length; i++) {
      if (!WhiteList.includes(tabsViewStore.tabsList[i].name)) {
        keepAliveComponentsTemp.push(tabsViewStore.tabsList[i].name);
      }
    }
    if (
      !WhiteList.includes(currentComName) &&
      !keepAliveComponentsTemp.includes(currentComName)
    ) {
      keepAliveComponentsTemp.push(currentComName);
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponentsTemp);
  });

  router.beforeEach((to) => {
    const resolved = router.resolve(to.path);
    if (!(resolved.matched.length > 0)) {
      router.replace({
        name: PageEnum.BASE_HOME_NAME,
      });
    }
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
