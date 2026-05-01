# API Discovery（API 发现）

> 原文：https://agents.craft.do/docs/browser/api-discovery.md
>
> 本文是中文摘译版，说明如何通过浏览器网络检查发现内部 API。

## 概览

许多网页后台本质上通过内部 API 加载数据。Browser 可以观察 network requests，帮助 agent 找到真实数据接口。发现 API 后，数据提取速度通常会比页面点击快很多。

## 工作流程

1. 用 browser 打开目标页面
2. 执行能触发数据加载的操作
3. 观察 network requests
4. 找到返回 JSON 或结构化数据的接口
5. 分析 headers、query parameters 和 response schema
6. 用 API source 或直接请求复用该接口

## 适合场景

* 表格数据分页提取
* Dashboard 指标抓取
* 后台列表导出
* 搜索结果批量读取
* 复杂页面中隐藏的 JSON 数据

## 需要记录的信息

| 信息 | 说明 |
| ---- | ---- |
| URL | 请求 endpoint |
| Method | GET、POST 等 |
| Headers | Authorization、Content-Type 等 |
| Query | page、limit、filter、cursor |
| Body | POST payload |
| Response | JSON 结构和字段含义 |

## 注意事项

* 内部 API 可能不稳定，页面改版后可能变化
* 认证 cookies 和 headers 需要安全处理
* 不要绕过系统权限边界
* 对写接口保持额外谨慎

## 使用建议

先用 browser 完成一次真实操作，再抽取 API。对大量数据抓取，优先使用 API；对视觉交互和不稳定流程，继续使用 browser。
