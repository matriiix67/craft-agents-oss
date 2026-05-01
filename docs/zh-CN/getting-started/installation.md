# Installation（安装）

> 原文：https://agents.craft.do/docs/getting-started/installation.md
>
> 本文是中文摘译版，保留安装流程、平台差异和验证步骤。

## 概览

Craft Agents 提供桌面应用，并支持 macOS、Windows 和 Linux。安装完成后，你可以创建 workspace、配置 LLM connection，并连接 sources 开始使用 agent。

## macOS

1. 下载 macOS 版本安装包。
2. 打开 `.dmg` 或压缩包。
3. 将 Craft Agents 拖入 Applications。
4. 首次打开时，如果系统提示安全确认，按 macOS 的提示允许打开。

安装后建议把应用固定到 Dock，方便快速创建和恢复 sessions。

## Windows

1. 下载 Windows 安装包。
2. 运行 installer。
3. 按向导完成安装。
4. 从 Start Menu 启动 Craft Agents。

如果公司网络限制下载或登录，请提前配置 proxy 或让网络管理员放行相关域名。

## Linux

Linux 版本通常通过 AppImage、deb 或其他发行包安装。下载后按发行版方式运行：

```bash
chmod +x Craft-Agents.AppImage
./Craft-Agents.AppImage
```

如果使用 `.deb`：

```bash
sudo dpkg -i craft-agents.deb
sudo apt-get install -f
```

## 首次启动

首次打开应用时，通常需要完成：

* 创建或选择 workspace
* 配置默认 LLM provider
* 添加 API key 或登录 provider
* 选择默认 working directory
* 按需连接 GitHub、Linear、Slack、local folders 等 sources

## 验证安装

可以用一个简单 prompt 验证应用是否正常：

```text
Say hello and tell me which model you are using.
```

如果 agent 能正常回复，说明基础安装和模型连接已经可用。

## 常见问题

### 无法连接模型

检查 API key、provider、base URL、proxy 和网络访问。公司网络下尤其需要确认 HTTPS proxy 和证书配置。

### 找不到本地文件

确认当前 session 的 working directory 已设置到正确项目目录。也可以把其他目录添加为 Local Folder source。

### Shell 命令被拦截

检查当前 permission mode。Explore mode 默认只允许安全只读命令；需要修改文件或运行更高风险命令时，切换到 Ask to Edit 或 Execute。

## 下一步

安装完成后，建议继续阅读：

* `core-concepts/conversations.md`
* `core-concepts/working-directory.md`
* `core-concepts/permissions.md`
* `sources/overview.md`
