import { h, Component } from "vue";
import { NIcon } from "naive-ui";
import { useRouter, RouteLocationRaw, Router } from "vue-router";
import { PageEnum } from "/@/enums/pageEnum";
/**
 * render 图标
 * */
export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
/**
 * 页面切换
 */
export type RouteLocationRawEx = Omit<RouteLocationRaw, "path"> & {
  path: PageEnum;
};
function handleError(e: Error) {
  console.error(e);
}
export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push, replace } = (_router || router) as Router;
  function go(
    opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME,
    isReplace = false
  ) {
    if (!opt) {
      return;
    }
    if (is(opt, "String")) {
      isReplace
        ? replace(opt as string).catch(handleError)
        : push(opt as string).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}
/**
 * 增亮颜色
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}
export function lighten(color: string, amount: number) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
}
/**
 * 生成uuid
 */
const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}
export function buildUUID(): string {
  let uuid = "";
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += "-";
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid.replace(/-/g, "");
}

export function deepCopy<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const copy: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}
