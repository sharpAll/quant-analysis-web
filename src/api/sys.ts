import http from "/@/utils/request";
import { LoginResult, BasicResult } from "/@/types/axios";
enum Api {
  // user login api
  Login = "/sys/login",
  // 美股行业目录
  UsIndustryTree = "/stocks/us/industry_tree",
  // 美股行业股票
  UsIndustryStock = "/stocks/us/industry_stock",
  // 美股行业指数价格
  UsIndustryPrice = "/stocks/us/industry_price",
  // 美股指数价格
  UsStockPrice = "/quotes/data/stock_price",
  // A股行业目录
  CnIndustryTree = "/stocks/cn/industry_tree",
  // A股行业股票
  CnIndustryStock = "/stocks/cn/industry_stock",
  // A股行业指数价格
  CnIndustryPrice = "/stocks/cn/industry_price",
  // 股票咨询-名称搜索
  StockWizard = "/stocks/news/wizard",
  // 股票咨询-股票资讯列表
  StockNewsList = "/stocks/news/news_list",
  // 股票咨询-AI资讯综述
  StockNewsSummarize = "/stocks/news/news_summarize",
  // 股票咨询-股票评级列表
  StockRecommendation = "/stocks/news/recommendation",
  // 股票咨询-AI评级综述
  StockRecommendationSummarize = "/stocks/news/recommendation_summarize",
}
interface LoginParams {
  username: string;
  password: string;
  captcha: string;
  uuid: string;
}
export function loginApi(params: LoginParams): Promise<LoginResult> {
  return http.request({
    url: Api.Login,
    method: "POST",
    data: params,
    headers: { ignoreToken: true },
  });
}

export function UsIndustryTree(): Promise<BasicResult> {
  return http.request({
    url: Api.UsIndustryTree,
    method: "POST",
  });
}

export function UsIndustryStock(params: {
  code: string[];
}): Promise<BasicResult> {
  return http.request({
    url: Api.UsIndustryStock,
    method: "POST",
    data: params,
  });
}

export function UsIndustryPrice(params: {
  start_date: string;
  end_date: string;
  codes: string[];
}): Promise<BasicResult> {
  return http.request({
    url: Api.UsIndustryPrice,
    method: "POST",
    data: params,
  });
}

export function UsStockPrice(params: {
  codes: string[];
}): Promise<BasicResult> {
  return http.request({
    url: Api.UsStockPrice,
    method: "POST",
    data: params,
  });
}

export function CnIndustryTree(): Promise<BasicResult> {
  return http.request({
    url: Api.CnIndustryTree,
    method: "POST",
  });
}

export function CnIndustryStock(params: {
  code: string[];
}): Promise<BasicResult> {
  return http.request({
    url: Api.CnIndustryStock,
    method: "POST",
    data: params,
  });
}

export function CnIndustryPrice(params: {
  codes: string[];
  start_date: string;
  end_date: null | string;
  use_normalize: boolean;
  use_equal_weight: boolean;
}): Promise<BasicResult> {
  return http.request({
    url: Api.CnIndustryPrice,
    method: "POST",
    data: params,
  });
}

export function StockWizard(params: { key: string }): Promise<BasicResult> {
  return http.request({
    url: Api.StockWizard,
    method: "POST",
    data: params,
  });
}

export function StockNewsList(params: {
  code: string;
  sources: string[];
  page_index: Number;
  page_size: Number;
}): Promise<BasicResult> {
  return http.request({
    url: Api.StockNewsList,
    method: "POST",
    data: params,
  });
}

export function StockNewsSummarize(params: {
  code: string;
}): Promise<BasicResult> {
  return http.request({
    url: Api.StockNewsSummarize,
    method: "POST",
    data: params,
  });
}

export function StockRecommendation(params: {
  code: string;
  page_index: Number;
  page_size: Number;
}): Promise<BasicResult> {
  return http.request({
    url: Api.StockRecommendation,
    method: "POST",
    data: params,
  });
}

export function StockRecommendationSummarize(params: {
  code: string;
}): Promise<BasicResult> {
  return http.request({
    url: Api.StockRecommendationSummarize,
    method: "POST",
    data: params,
  });
}
