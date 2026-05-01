# Browser Examples & Recipes（浏览器示例）

> 原文：https://agents.craft.do/docs/browser/examples.md
>
> 本文是中文摘译版，整理常见浏览器自动化 recipes。

## 登录流程

适合需要人工账号的网站：

```text
Open the admin dashboard. I will log in manually, then continue the task.
```

登录后，agent 可以继续读取页面、点击导航和提取数据。

## 表单填写

```text
Open the onboarding form and fill it using this customer data.
```

建议先让 agent 预览字段，再确认提交，尤其是生产系统。

## 数据提取

```text
Open this table and extract all rows into a CSV summary.
```

如果页面分页，告诉 agent 如何翻页或让它自动发现 next controls。

## 下载文件

```text
Open the reports page and download the latest PDF report.
```

下载后可以继续让 agent 总结、转换或归档文件。

## 上传文件

```text
Upload this CSV to the import page, then stop before final submit.
```

对会修改远端系统的上传任务，建议在最终提交前人工确认。

## 页面验证

```text
Open localhost:3000 and verify the settings page loads without console errors.
```

适合前端开发时做快速 smoke test。

## 数据提取升级为 API

先用 browser 观察页面和网络请求，再把稳定请求改成 API source。这样可以减少点击和等待，提高可靠性。
