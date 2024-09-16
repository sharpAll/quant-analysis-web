<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider
      ><n-message-provider><router-view /></n-message-provider
    ></n-dialog-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import { lighten } from "/@/utils/common";
// naive主题模块
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#0d9488",
    primaryColorHover: lighten("#0d9488", 6),
    primaryColorPressed: lighten("#0d9488", 6),
    infoColor: "#0d9488",
    infoColorHover: lighten("#0d9488", 6),
    infoColorPressed: lighten("#0d9488", 6),
    successColor: "#0d9488",
    successColorHover: lighten("#0d9488", 6),
    successColorPressed: lighten("#0d9488", 6),
  },
};
</script>
<style lang="scss">
@import "/@/design/main.scss";
</style>
