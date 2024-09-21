import { h } from "vue";
export const usChartOptions = {
  title: {
    text: "",
    left: "center",
  },
  animation: false,
  tooltip: {
    trigger: "axis",
    show: true,
  },
  axisPointer: {
    // 去掉tooltip中的时分秒
    label: {
      formatter: function (params: any) {
        const date = new Date(params.value);
        const day = date.toLocaleDateString();
        return day;
      },
    },
  },
  xAxis: [
    {
      type: "time",
      axisLabel: {
        formatter: function (value: string) {
          return "{yyyy}-{MM}-{dd}";
        },
        hideOverlap: true,
      },
    },
  ],
  yAxis: [
    {
      name: "",
      type: "value",
      scale: true,
    },
    {
      name: "",
      type: "value",
      position: "right",
      scale: true,
    },
  ],
  legend: {
    bottom: "10",
    data: ["行业指数", "纳斯达克", "道琼斯", "标普"],
    selected: {
      行业指数: true,
      纳斯达克: true,
      道琼斯: false,
      标普: false,
    },
  },
  color: [
    "#C00000",
    "#555A5D",
    "#6E44BA",
    "#004589",
    "#00A06C",
    "#7CA02D",
    "#0092F8",
    "#C5C6C8",
  ],
  series: [
    {
      name: "行业指数",
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "纳斯达克",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "道琼斯",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "标普",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
  ],
};

export const cnChartOptions = {
  title: {
    text: "",
    left: "center",
  },
  animation: false,
  tooltip: {
    trigger: "axis",
    show: true,
  },
  axisPointer: {
    // 去掉tooltip中的时分秒
    label: {
      formatter: function (params: any) {
        const date = new Date(params.value);
        const day = date.toLocaleDateString();
        return day;
      },
    },
  },
  xAxis: [
    {
      type: "time",
      axisLabel: {
        formatter: function (value: string) {
          return "{yyyy}-{MM}-{dd}";
        },
        hideOverlap: true,
      },
    },
  ],
  yAxis: [
    {
      name: "",
      type: "value",
      scale: true,
    },
    {
      name: "",
      type: "value",
      position: "right",
      scale: true,
    },
  ],
  legend: {
    bottom: "10",
    data: ["行业指数", "上证", "深证", "沪深300", "创业板"],
    selected: {
      行业指数: true,
      上证: true,
      深证: false,
      沪深300: false,
      创业板: false,
    },
  },
  color: [
    "#C00000",
    "#555A5D",
    "#6E44BA",
    "#004589",
    "#00A06C",
    "#7CA02D",
    "#0092F8",
    "#C5C6C8",
  ],
  series: [
    {
      name: "行业指数",
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "上证",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "深证",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "沪深300",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
    {
      name: "创业板",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      symbol: "none",
      data: [],
    },
  ],
};
