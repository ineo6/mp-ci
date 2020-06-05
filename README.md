# 微信小程序(游戏)发布助手（mp-ci）

[![version][version-badge]][package]
[![downloads][downloads-badge]][npm-stat]

[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

微信小程序(游戏)发布助手, 支持预览和上传。可以和`Jenkins`、`GitHub Actions`结合使用，实现自动化发布。

基于官方`miniprogram-ci`封装。

## 功能特性

- 无需扫码登录
- 自动读取`appid`、`setting`
- 提交信息智能生成
- 美化执行结果显示

## Installation

```shell
// 全局安装
npm install -g mp-ci

// 本地安装
npm install --save-dev mp-ci
```

> 使用前需要使用小程序管理员身份访问"[微信公众平台](https://mp.weixin.qq.com/)-开发-开发设置"后下载代码上传密钥，并配置 IP 白名单，才能进行上传、预览操作。

### 注意事项

- 代码上传密钥拥有预览、上传代码的权限
- 代码上传密钥不会明文存储在微信公众平台上，一旦遗失必须重置，请妥善保管
- 未配置IP白名单的，将无法使用 `mp-ci` 进行预览和上传
- 可选择不对IP进行限制，但务必明白风险

## Usage

```sh
Usage: mp-ci [--options ...]

Options:
  -V, --version                  output the version number
  -h, --help                     display help for command

Commands:
  upload [options] [workspace]   上传代码
  preview [options] [workspace]  预览代码
  help [command]                 display help for command
```


`Commands`里面的`workspace`代表项目目录，默认使用命令执行目录，同时会检查`project.config.json`文件是否存在，并读取`appid`、`setting`设置。

命令返回的结果值如下:

- 0: 成功
- 1: 失败

### upload

```sh
Usage: mp-ci upload [options] [workspace]

上传代码

Options:
  --env [value]     环境 (default: "dev")
  --type [value]    项目类型 (default: "miniProgram")
  --ver [value]     发布版本号 (default: "0.0.0")
  --desc [value]    发布简介
  --pkp [value]     私钥文件所在路径
  --test            输出二维码 (default: true)
  --no-test         禁止输出二维码
  --qr [value]      二维码文件的格式: terminal|base64|image (default: "image")
  --qrDest [value]  二维码文件保存路径  (default: "preview.png")
  --proxy [value]   代理url
  --robot [value]   指定CI机器人，1 ~ 30 (default: "1")
  -h, --help        display help for command
```

### preview

```sh
Usage: mp-ci preview [options] [workspace]

预览代码

Options:
  --env [value]          环境 (default: "dev")
  --type [value]         项目类型 (default: "miniProgram")
  --ver [value]          发布版本号 (default: "0.0.0")
  --desc [value]         发布简介
  --pkp [value]          私钥文件所在路径
  --qr [value]           二维码文件的格式: terminal|base64|image (default: "image")
  --qrDest [value]       二维码文件保存路径  (default: "preview.png")
  --pagePath [value]     预览页面路径
  --searchQuery [value]  预览页面路径启动参数，这里的&字符在命令行中应写成转义字符\&
  --proxy [value]        代理url
  --robot [value]        指定CI机器人，1 ~ 30 (default: "1")
  -h, --help             display help for command
```
 
说明：

#### `version` & `ver`

* `version`版本号规则
  * 尝试读取目录下的 `package.json` 文件中`version`
  * 获取项目(`git`)最新`commit`的`hash`值
  * 组合: `${version}.${hash}.${env}`
  * 例如: `1.0.0.6a9ef0a.dev`
* `desc`备注规则
  * 读取命令行中传入的环境参数: `--env`
  * 读取命令行中传入的备注参数: `--desc`
  * 获取项目(`git`)最新`commit`的`message`
  * 组合: `env: ${env} ${desc || message}`
  * 例如: `env: dev 补充信息` 
 
#### `pkp`
 
私钥文件位置。
 
小程序管理员身份访问"[微信公众平台](https://mp.weixin.qq.com/)-开发-开发设置"后下载密钥。
 
#### `qr`

可选值包括 `terminal`, `base64`, `image`。

#### `qrDest`

当`qr`设置为`base64`、`image`时，需要设置`qrDest`指定输出位置（相对于项项目目录）。

#### `test`

`upload`命令特有的参数，在上传成功后，会和`preview`命令一样生成二维码。当前是需要`qr`、`qrDest`命令配合。

#### `searchQuery`

预览页面启动参数。

**这里的`&`字符在命令行中应写成转义字符`\&`**

## 相关资源

- [mp-ci-demo](https://github.com/ineo6/mp-ci-demo) ：`Taro`和`GitHub Actions`持续集成示例

[version-badge]: https://img.shields.io/npm/v/mp-ci.svg?style=flat-square
[package]: https://www.npmjs.com/package/mp-ci
[downloads-badge]: https://img.shields.io/npm/dm/mp-ci.svg?style=flat-square
[npm-stat]: http://npm-stat.com/charts.html?package=mp-ci&from=2018-10-31
[license-badge]: https://img.shields.io/npm/l/mp-ci.svg?style=flat-square
[license]: https://github.com/ineo6/mp-ci/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: htts://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/ineo6/mp-ci.svg?style=social
[github-watch]: https://github.com/ineo6/mp-ci/watchers
[github-star-badge]: https://img.shields.io/github/stars/ineo6/mp-ci.svg?style=social
[github-star]: https://github.com/ineo6/mp-ci/stargazers

