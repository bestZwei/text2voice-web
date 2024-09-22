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

API1(voice-api) 通过Cloudflare workers 或者 docker 部署 [voice-api ](https://github.com/bestZwei/voice-api/blob/main/worker.js)，记得设置环境变量 API_KEY。

API2(lobe-api) 通过 [Deno](https://dash.deno.com/) 在 Playground 中部署 [deno_tts_api.ts](https://github.com/bestZwei/voice-api/blob/main/deno_tts_api.ts)

### 使用方法

+ **部署自己的API**，访问 https://github.com/bestZwei/voice-api
+ 复制 worker.js 部署到 CF Workers
+ 添加环境变量 API_KEY，假设是`@ak47`
+ 绑定自定义域名，假设是  `https://ttsapi.zwei.de.eu.org`
+ 可以部署另一个 API 服务：注册 [Deno](https://dash.deno.com/) ，新建、并在 Playground 中复制部署 [deno_tts_api.ts](https://github.com/bestZwei/voice-api/blob/main/deno_tts_api.ts)，可以设置自定义域名，也可以用它提供的 xxx.deno.dev
+ **部署前端**，访问 https://github.com/bestZwei/text2voice-web
+ fork 准备修改代码
+ script.js 第 126 行 `@ak47` 修改成自己的 API_KEY。
+ speakers.json 中， 第 3 行修改 `https://ttsapi.zwei.de.eu.org/tts` 改成你 workers 部署的 API **链接 + /tts** ，第 50 行`https://tts-api.deno.dev/v1/audio/speech` 改成你 Deno 部署的API **链接+ /v1/audio/speech**
+ 部署本项目到 Cloudflare Pages 或者 Vercel 等类似平台。
+ 设置自定义域名
