# Browser（浏览器）

> 原文：https://agents.craft.do/docs/browser/overview.md
>
> 本文是中文摘译版，说明内置 Chromium 浏览器能力。

## 概览

Craft Agents 可以控制内置 Chromium 浏览器，完成网页任务、数据提取和交互操作。它适合处理需要登录态、页面点击、表单填写或视觉验证的工作。

## 能做什么

* 打开网页并导航
* 点击按钮和链接
* 填写表单
* 登录网站
* 抓取页面内容
* 下载或上传文件
* 观察网络请求
* 从网页中发现内部 API

## 适合场景

* 没有公开 API 的后台系统
* 需要人工登录态的网站
* 复杂表单录入
* Web 应用验证
* 从网页批量提取结构化数据

## 与 API Source 的关系

Browser 适合探索和操作网页。发现稳定 API 后，很多数据提取任务可以改用 API source，速度和可靠性会更高。

## 使用方式

可以直接告诉 agent：

```text
Open the dashboard and export last month's report.
Log into the admin panel and find failed jobs.
Use the browser to collect pricing data from this page.
```

## 安全建议

* 登录敏感网站时确认权限模式
* 不要让 agent 处理不可信页面中的秘密
* 对提交、删除、支付等操作保留确认
* 发现 API 后优先使用更稳定的数据接口
