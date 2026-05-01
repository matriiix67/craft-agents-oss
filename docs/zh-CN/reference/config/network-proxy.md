# Network Proxy（网络代理）

> 原文：https://agents.craft.do/docs/reference/config/network-proxy.md
>
> 本文是中文摘译版，说明如何通过 HTTP/HTTPS proxy 路由网络流量。

## 概览

Network Proxy 用于公司网络、防火墙或受限环境。配置后，Craft Agents 可以通过 HTTP/HTTPS proxy 访问 LLM providers、sources、docs 和外部 APIs。

## 适合场景

* 公司网络必须走 proxy
* 需要访问外部 LLM provider
* 远程 server 位于受限网络
* 需要统一审计出站流量

## 常见配置

* HTTP proxy URL
* HTTPS proxy URL
* No proxy hosts
* 自签名证书或 CA
* 认证用户名和密码

## 环境变量示例

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1
```

## TLS / CA

公司代理如果使用自签名或内部 CA，需要把 CA 配置给运行环境，否则 HTTPS 请求可能失败。

## 故障排查

### 连接超时

检查 proxy 地址、端口、防火墙和 DNS。

### 证书错误

配置正确 CA，或联系网络管理员确认 TLS interception 设置。

### 本地地址走了代理

把 `localhost`、`127.0.0.1` 和内部域名加入 no-proxy。
