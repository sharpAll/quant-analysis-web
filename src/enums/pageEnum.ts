export enum PageEnum {
  // 登录,
  BASE_LOGIN_NAME = "Login",
  // 重定向
  REDIRECT = "/redirect",
  REDIRECT_NAME = "Redirect",
  // 首页
  BASE_HOME = "/home",
  BASE_HOME_NAME = "Home",
}

// 无需添加进标签页的页面
// 无需提供keep-alive功能的页面
export const WhiteList: string[] = [
  PageEnum.BASE_LOGIN_NAME,
  PageEnum.REDIRECT_NAME,
];
