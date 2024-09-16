import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "../store/user";
import { useTabsViewStore } from "/@/store/tabsView";
import router from "/@/router";
import { PageEnum } from "/@/enums/pageEnum";
import { createDiscreteApi } from "naive-ui";
const { message, dialog } = createDiscreteApi(["message", "dialog"]);
/**
 * 通用API配置
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// http.interceptors.request.use(
//   (config): AxiosRequestConfig<any> | undefined => {
//     if ((config as any).headers.ignoreToken === true) {
//       return config;
//     }
//     const userStore = useUserStore();
//     const token = userStore.token;
//     if (token) {
//       (config as any).headers.token = token;
//       return config;
//     } else {
//       dialog.success({
//         title: "温馨提醒",
//         content: "登录信息过期，请重新登录",
//         positiveText: "确定",
//         negativeText: "取消",
//         showIcon: false,
//         onPositiveClick: () => {
//           userStore.clearUserInfo();
//           const tabsViewStore = useTabsViewStore();
//           tabsViewStore.clearCurrentTabs();
//           router.replace({
//             name: PageEnum.BASE_LOGIN_NAME,
//             query: {
//               redirect: router.currentRoute.value.fullPath,
//             },
//           });
//         },
//       });
//     }
//   },
//   (error) => {
//     return Promise.reject();
//   }
// );

http.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data.code === 200) {
        return response.data;
      } else if (response.data.code === 401) {
        (window as any).$dialog.success({
          title: "温馨提醒",
          content: response.data.msg,
          positiveText: "确定",
          negativeText: "取消",
          showIcon: false,
          onPositiveClick: () => {
            router.replace({
              name: PageEnum.BASE_LOGIN_NAME,
              query: {
                redirect: router.currentRoute.value.fullPath,
              },
            });
          },
        });
      } else {
        message.error(response.data.msg);
      }
      return Promise.reject();
    }
  },
  (error) => {
    return Promise.reject();
  }
);

export default http;
