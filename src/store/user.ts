import { defineStore } from "pinia";
import { userEnum } from "/@/enums/userEnum";
import { Storage } from "/@/utils/storage";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: Storage.get(userEnum.ACCESS_TOKEN),
      username: Storage.get(userEnum.CURRENT_USER),
    };
  },
  actions: {
    setToken(token: string, ex: number) {
      this.token = token;
      Storage.set(userEnum.ACCESS_TOKEN, token, ex * 1000);
    },
    setUserName(name: string, ex: number) {
      this.username = name;
      Storage.set(userEnum.CURRENT_USER, name, ex * 1000);
    },
    clearUserInfo() {
      this.username = null;
      this.token = null;
      Storage.remove(userEnum.ACCESS_TOKEN);
      Storage.remove(userEnum.CURRENT_USER);
    },
  },
});
