<template>
  <div class="w-full h-full component-content">
    <div class="box">
      <div class="left">
        <n-scrollbar style="max-height: 100%">
          <n-tree
            block-line
            :data="industryMenuOptions"
            key-field="code"
            label-field="name"
            selectable
            @update:selected-keys="handleUpdateValue"
          />
        </n-scrollbar>
      </div>
      <div class="right">
        <div ref="rightContentRef" class="w-full h-full">
          <n-tabs default-value="list" type="line" animated>
            <n-tab-pane name="list" tab="个股列表" display-directive="show">
              <n-data-table
                :columns="columns"
                :data="tableData"
                :bordered="false"
                :max-height="'calc(100vh - 200px)'"
              />
            </n-tab-pane>
            <n-tab-pane name="charts" tab="行业趋势" display-directive="show">
              <div class="mb-15px">
                <n-checkbox-group
                  v-model:value="stockIndexs"
                  @update:value="stockIndexsChange"
                >
                  <n-space item-style="display: flex;">
                    <n-checkbox
                      v-for="item in stockIndexsOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    />
                    <n-checkbox :value="parentIndex.value">{{
                      parentIndex.label
                    }}</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </div>
              <n-scrollbar style="max-height: calc(100vh - 210px)">
                <div class="overflow-hidden">
                  <div
                    v-for="chart in chartDataRef"
                    :key="chart.title"
                    :ref="setChartRefs"
                    class="h-250px float-left"
                    :style="{ width: chartWidthRef + 'px' }"
                  ></div>
                </div>
              </n-scrollbar>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="StockUs">
import { ref, Ref, onMounted, nextTick } from "vue";
import {
  CnIndustryTree,
  CnIndustryStock,
  CnIndustryPrice,
  UsStockPrice,
} from "/@/api/sys";
import * as echarts from "echarts";
import { cnChartOptions } from "/@/utils/chartOptions";
import { deepCopy } from "/@/utils/common";
const industryMenuOptions = ref([]);
getIndustryMenu();
async function getIndustryMenu() {
  const res = await CnIndustryTree();
  traverseTree(res.data);
  industryMenuOptions.value = res.data;
}
function traverseTree(data: any[]) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.children && item.children.length === 0) {
      delete item.children;
    } else if (item.children && item.children.length > 0) {
      traverseTree(item.children);
    }
  }
}
const handleUpdateValue = async (key: string, options: any) => {
  const res = await CnIndustryStock({ code: key });
  tableData.value = res.data.list;
  const chartsData = options[0];
  if (chartsData.children === undefined) {
    chartrefs = [];
    chartDataRef.value = [];
  } else {
    initCharts(chartsData);
  }
};
const tableData = ref([]);
const columns = ref([
  {
    title: "代码",
    key: "code",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "行业",
    key: "product_type",
  },
  {
    title: "pe",
    key: "pe",
    sorter: "default",
  },
  {
    title: "pb",
    key: "pb",
    sorter: "default",
  },
  {
    title: "mv",
    key: "mv",
    sorter: "default",
  },
  {
    title: "div",
    key: "div",
    sorter: "default",
  },
  {
    title: "简介",
    key: "product_name",
    width: 300,
  },
]);
const rightContentRef: Ref<HTMLElement | undefined> = ref();
const chartWidthRef: Ref<number> = ref(0);
const chartDataRef: Ref<any[]> = ref([]);
let chartrefs: any[] = [];
let chartInstances: any[] = [];
function setChartRefs(el: any) {
  if (!chartrefs.includes(el)) {
    chartrefs.push(el);
  }
}
onMounted(() => {
  // 计算chart的宽度，防止渲染异常
  chartWidthRef.value = (rightContentRef.value?.offsetWidth as number) / 3 - 10;
});

const parentIndex = ref({
  label: "",
  value: "",
});
let parentData: any = [];
async function initCharts(data: any) {
  parentIndex.value.label = data.name;
  parentIndex.value.value = data.code;
  const resParent = await CnIndustryPrice({
    start_date: "2024-01-01",
    end_date: null,
    use_normalize: false,
    use_equal_weight: false,
    codes: data.code,
  });
  parentData = resParent.data.map((item: any) => {
    return [new Date(item.date).getTime(), item[data.code]];
  });
  const childrenCodes = data.children.map((item: any) => item.code);
  const res = await CnIndustryPrice({
    start_date: "2024-01-01",
    end_date: null,
    use_normalize: false,
    use_equal_weight: false,
    codes: childrenCodes,
  });
  const chartOptionsData = [];
  for (let i = 0; i < data.children.length; i++) {
    const child = data.children[i];
    const chartData = res.data.map((item: any) => {
      return [new Date(item.date).getTime(), item[child.code]];
    });
    const chartTitle = child.name;
    chartOptionsData.push({ title: chartTitle, data: chartData });
  }
  chartrefs = [];
  chartDataRef.value = chartOptionsData;
  await nextTick();
  chartrefs = chartrefs.filter((item) => item !== null);
  for (let i = 0; i < chartDataRef.value.length; i++) {
    chartDataRef.value[i].chartRef = chartrefs[i];
  }
  drawCharts();
}

let indexData: any = [];
const stockIndexs = ref(["000001.SH"]);
const stockIndexsOptions = ref([
  {
    label: "上证",
    value: "000001.SH",
  },
  {
    label: "深证",
    value: "399001.SZ",
  },
  {
    label: "沪深300",
    value: "00300.SH",
  },
  {
    label: "创业板",
    value: "399006.SZ",
  },
]);
function drawCharts() {
  chartInstances = [];
  for (let i = 0; i < chartDataRef.value.length; i++) {
    const curChart = chartDataRef.value[i];
    const chart = echarts.init(curChart.chartRef);
    const chartSetting = deepCopy(cnChartOptions);
    chartSetting.title.text = curChart.title;
    chartSetting.series[0].data = curChart.data;
    chartSetting.legend.data.push(parentIndex.value.label);
    chartSetting.series.push({
      name: parentIndex.value.label,
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none",
      data: parentData,
    });
    chartSetting.legend.selected = getLengendSelect(stockIndexs.value);
    const start = curChart.data[0][0];
    const filterIndexData = indexData.filter((item: any) => item.date >= start);
    for (let j = 0; j < stockIndexsOptions.value.length; j++) {
      const curOptions = stockIndexsOptions.value[j];
      const series: any = chartSetting.series.find(
        (item: any) => item.name === curOptions.label
      );
      series.data = filterIndexData.map((item: any) => [
        item.date,
        item[curOptions.value],
      ]);
    }
    chart.setOption(chartSetting);
    // 将chart实例赋值在ref变量中会出现渲染异常的bug
    // chartDataRef.value[i].chart = chart;
    chartInstances.push(chart);
  }
}
getIndexData();
async function getIndexData() {
  const res = await UsStockPrice({
    codes: stockIndexsOptions.value.map((item) => item.value),
  });
  res.data.forEach((item: any) => {
    item.date = new Date(item.date).getTime();
  });
  indexData = res.data;
}
const stockIndexsChange = (value: string[]) => {
  const selected: any = getLengendSelect(value);
  for (let i = 0; i < chartInstances.length; i++) {
    chartInstances[i].setOption({
      legend: { selected: selected },
    });
  }
};
function getLengendSelect(value: string[]) {
  const selected: any = { 行业指数: true };
  stockIndexsOptions.value.forEach((item) => {
    if (value.includes(item.value)) {
      selected[item.label] = true;
    } else {
      selected[item.label] = false;
    }
  });
  if (value.includes(parentIndex.value.value)) {
    selected[parentIndex.value.label] = true;
  } else {
    selected[parentIndex.value.label] = false;
  }
  return selected;
}
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 330px; /* 固定宽度 */
  }

  .right {
    flex: 1; /* 占据剩余空间 */
  }
}
</style>
