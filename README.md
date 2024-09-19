# Text2Voice Web

一个简单的文本转语音应用程序，支持通过 API 调用将文本转换为语音，并提供在线试听和下载功能。该项目包括一个使用 Bootstrap 构建的前端页面，支持通过 Cloudflare Pages 部署。

Demo: https://text2speech.ciallo.de/

![image](https://i0.img2ipfs.com/ipfs/QmQosWR2Nc84DPQNUj3VfJcjmuZowSYYU4gm7sMBtG5oNi)

## 功能特性

- 支持文本转语音 API
- 在线试听前20个字
- 语音生成并提供下载
- 历史记录保存

## 前端页面展示

前端页面采用柔和的渐变色设计，简洁美观，并在文本框、滑块等交互控件上增加了细腻的交互效果，使用户体验更加友好。

## API

通过Cloudflare workers 或者 docker 部署 [voice-api ](https://github.com/bestZwei/voice-api)，记得设置环境变量 API_KEY

### 使用方法

+ **部署自己的API**，访问 https://github.com/bestZwei/voice-api

+ 复制 worker.js 部署到 CF Workers
+ 添加环境变量 API_KEY，假设是`@ak47`
+ 绑定自定义域名，假设是  `https://ttsapi.zwei.de.eu.org`
+ **部署前端**，访问 https://github.com/bestZwei/text2voice-web
+ fork 准备修改代码
+ script.js 第 3 行修改 `https://ttsapi.zwei.de.eu.org/tts` 改成你部署的 API **链接 + /tts**
+ script.js 第 140 行 `@ak47` 修改成自己的 API_KEY。
+ 部署本项目到 Cloudflare Pages 或者 Vercel 等类似平台。
+ 设置自定义域名
