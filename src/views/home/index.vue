<template>
  <div class="w-full h-full component-content">
    <div class="bg-box">
      <div class="bg-home">
        <n-card title="2024/09/16&nbsp;&nbsp;&nbsp;&nbsp;V1.0.0">
          美股与A股的行业分类，各行业股票结构，行业指数与市场主要指数的比较。
        </n-card>
        <n-card
          class="mt-10px"
          title="2024/09/21&nbsp;&nbsp;&nbsp;&nbsp;V1.0.1"
        >
          行业趋势中加入时间调整控件，行业趋势Y轴坐标改为自适应，修复重复点击目录出现错误的问题。
        </n-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home"></script>
<style scoped lang="scss">
.bg-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-home {
  justify-items: center;
  width: 80%;
  height: 80%;
  // background: url("/@/assets/img/Business.svg") center no-repeat;
  background-size: contain;
}
</style>
