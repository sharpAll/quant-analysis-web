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
    </n-grid>
    <n-grid class="px-3">
      <n-gi :span="18">
        <n-data-table
          remote
          :columns="columns"
          :data="tableData"
          :bordered="false"
          :max-height="'calc(100vh - 270px)'"
          :loading="tableLoading"
          :pagination="pagination"
          @update:page="handlePageChange"
        />
      </n-gi>
      <n-gi :span="6">
        <n-card :title="'AI评级综述'" size="small">
          <n-spin :show="loading">
            <n-scrollbar style="height: calc(100vh - 240px)">
              <div style="white-space: pre-line" v-html="AIcontent"></div>
            </n-scrollbar>
          </n-spin>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
<script setup lang="ts" name="Rating">
import { ref, h, reactive } from "vue";
import { SelectOption, NTag, NButton } from "naive-ui";
import {
  StockWizard,
  StockRecommendation,
  StockRecommendationSummarize,
} from "/@/api/sys";
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
async function getTableList() {
  tableLoading.value = true;
  const res = await StockRecommendation({
    code: curCode.value as string,
    page_index: pagination.page,
    page_size: pagination.pageSize,
  });
  tableLoading.value = false;
  tableData.value = res.data.list;
  pagination.pageCount = res.data.total_pages;
  pagination.itemCount = res.data.total_rows;
}
const codeDataInit = async (value: string) => {
  curCode.value = value;
  getTableList();
  loading.value = true;
  const resSummarize = await StockRecommendationSummarize({ code: value });
  AIcontent.value = resSummarize.data.content;
  loading.value = false;
};
const tableLoading = ref(false);
const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 20,
  itemCount: 0,
});
async function handlePageChange(currentPage: number) {
  pagination.page = currentPage;
  getTableList();
}
const columns = ref([
  {
    title: "标题",
    key: "title",
  },
  {
    title: "日期",
    key: "date",
    width: 200,
  },
  {
    title: "来源",
    key: "source",
    width: 100,
  },
  {
    title: "操作",
    key: "action",
    width: 100,
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
</script>
<style scoped lang="scss"></style>
