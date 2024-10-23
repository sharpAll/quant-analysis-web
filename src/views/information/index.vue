<template>
  <div class="w-full h-full component-content">
    <n-grid class="p-3">
      <n-gi :span="8">
        <n-auto-complete
          v-model:value="codeLabelValue"
          :input-props="{ autocomplete: 'disabled' }"
          :options="codeOptions"
          :render-label="renderCodeLabel"
          :clearable="true"
          placeholder="输入名称、首字母拼音或代码"
          @update:value="codeChange"
          @select="codeDataInit"
        />
      </n-gi>
      <n-gi :span="10">
        <n-space item-style="display: flex;" align="center" justify="end">
          <n-checkbox-group v-model:value="source" @update:value="sourceChange">
            <n-space>
              <n-checkbox value="futu" label="富途" />
              <n-checkbox value="laohu8" label="老虎" />
            </n-space>
          </n-checkbox-group>
        </n-space>
      </n-gi>
    </n-grid>
    <n-grid class="px-3">
      <n-gi :span="18">
        <n-data-table
          :columns="columns"
          :data="tableData"
          :bordered="false"
          :max-height="'calc(100vh - 220px)'"
        />
      </n-gi>
      <n-gi :span="6">
        <n-card :title="'AI资讯综述'" size="small">
          <n-spin :show="loading">
            <n-scrollbar style="height: calc(100vh - 290px)">
              <div style="white-space: pre-line" v-html="AIcontent"></div>
            </n-scrollbar>
          </n-spin>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
<script setup lang="ts" name="Information">
import { ref, h } from "vue";
import { SelectOption, NTag, NButton } from "naive-ui";
import { StockWizard, StockNewsList, StockNewsSummarize } from "/@/api/sys";
const codeLabelValue = ref(null);
const curCode = ref<string | null>(null);
const codeOptions = ref<any[]>([]);
const renderCodeLabel = (option: SelectOption) => [
  option.label as string,
  " ",
  h(NTag, { size: "small" }, { default: () => option.value }),
];
const codeChange = async (value: string) => {
  if (value === null || value.length < 2 || value === "00" || value === "000") {
    return;
  }
  const res = await StockWizard({
    key: value,
  });
  const resList = res.data;
  codeOptions.value = resList.map((item: any) => {
    return {
      label: item.name,
      value: item.code,
      market: item.market,
    };
  });
};
const codeDataInit = async (value: string) => {
  curCode.value = value;
  const res = await StockNewsList({
    code: value,
    sources: source.value,
    page_index: 1,
    page_size: 20,
  });
  tableData.value = res.data.list;
  loading.value = true;
  const resSummarize = await StockNewsSummarize({ code: value });
  AIcontent.value = resSummarize.data.content;
  loading.value = false;
};
const source = ref(["futu", "laohu8"]);
const columns = ref([
  {
    title: "标题",
    key: "title",
  },
  {
    title: "概述",
    key: "summary",
  },
  {
    title: "日期",
    key: "date",
    width: 200,
  },
  {
    title: "操作",
    key: "action",
    width: 80,
    render(row: any) {
      return h(
        NButton,
        {
          text: true,
          type: "primary",
          onClick: () => window.open(row.source_url),
        },
        { default: () => "查看" }
      );
    },
  },
]);
const tableData = ref([]);
const AIcontent = ref("");
const loading = ref(false);
const sourceChange = async () => {
  if (codeLabelValue.value !== null) {
    const res = await StockNewsList({
      code: curCode.value as string,
      sources: source.value,
      page_index: 1,
      page_size: 20,
    });
    tableData.value = res.data.list;
  }
};
</script>
<style scoped lang="scss"></style>
