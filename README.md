# Migirh

Migirh （_**Mi**nyami **G**UI for **I**ndependent **R**ecording **H**LS_）是一个 Minyami GUI。

[Minyami](https://github.com/Last-Order/Minyami) 是空空（ @Last-Order ）开发的一个可爱的HLS下载器。

## Migirh 怎么念

就像 みぎり （me-gi-li）一样，当然你可以有自己的想法。或者直接叫它Minyami GUI。

## 使用说明

启动主界面后，你可以单击新建任务，在打开的表单中填入你要传给Minyami的全部参数，然后开始任务。

你可能觉得这样太麻烦，看到顶部巨大的文本框吗，这里是Migirh快速处理文本框。你可以在此输入M3U8地址、Minyami命令或是支持的网站视频页面的地址（目前还未支持），然后单击后面的按钮就可以一步生成参数了。

> 如果需要使用 Proxifier 来控制网络代理，你需要给`migirh-node.exe`设置规则。它是`Migirh-core`实际执行的进程名。

## ~~功能列表~~ Todo List

- [x] 填写参数表单，以此启动Minyami
- [x] 直接填写Minyami命令行或支持的网址，直接解析出Minyami参数并启动
- [x] 同时启动多个Minyami进程并管理
- [x] 任务启动、暂停、恢复和终止
- [x] 多语言支持
- [x] 下载进度列表
- [ ] 任务详情页展示Minyami日志（由于Minyami限制，现在展示的是Migirh生成的模拟日志）
- [x] 已下载任务管理
- [x] 下载任务分类，支持选择分类快速填写目录
- [x] 保存公用参数，快速填写Minyami任务参数
- [x] 已下载任务删除支持同时删除文件
- [ ] 任务列表右键菜单
- [ ] 已完成任务支持快速跳转到当前目录或直接打开
- [ ] 支持插件扩展快速解析栏，以方便扩展支持更多网站
- [ ] 可配置本地端口号（目前固定为46015，不可修改）
- [ ] Windows自动构建脚本
- [ ] Github Action自动构建脚本
- [ ] 托盘区驻留功能
- [ ] Electron版本支持macOS
- [ ] 组件自动更新（Minyami、Migirh-core和Migirh-frontend）
- [ ] 深色模式
- [ ] 用于提供远程访问的WebUI和脱离Electron部署模式
- [ ] 用于WebUI的用户系统和角色系统
- [ ] 用于WebUI的通过HTTP向用户提供已下载文件
- [ ] 用于WebUI的权限系统和服务器保存目录选择器
- [ ] 不同用户的全局Minyami预设分开存储
- [ ] 支持插件的任务生命周期钩子
- [ ] 插件扩展前端或前端插件模式

## 从源码构建

Migirh 的源码分为三个部分提供：

|模块名|用途
|:---|:---
|[Migirh-core](https://github.com/zyzsdy/Migirh-core)|核心组件，提供数据库API，Minyami进程管理功能
|[Migirh-frontend](https://github.com/zyzsdy/Migirh-frontend)|前端
|[Migirh-electron](https://github.com/zyzsdy/Migirh-electron) 本版本库|Electron API和Electron构建

另外，为了Electron版本与Web版本的通用化考虑。Electron的asar内部只封装了基本的启动脚本和Electron API（即本版本库内容），而Migirh-core由一个独立的Node承载。

### 构建流程

1. 从`Migirh-electron` clone源码，`npm i`安装。
2. 在`Migirh-electron` 目录下建立`libs`目录。
3. 从`Migirh-core` clone源码，`npm i`安装，`npm run build`构建发布版本。
4. 复制`dist` `node_modules` `config.default.yaml` `LICENSE` `package.json` `package-lock.json` `README.md`到`Migirh-electron/libs/migirh-core`
（当然，另一种更好的方法是不要复制node_modules，而是在目标目录执行`npm i`。这适用于本地构建，而CI则会使用直接复制）
5. 在`Migirh-electron/libs/migirh-core`建立一个config.yaml，内容为`frontendStaticServeDir: ../migirh-frontend/build/`
6. 从`Migirh-frontend` clone源码，`npm i`安装，`npm run build`构建发布版本。
7. 复制`build` `LICENSE` `package.json` `package-lock.json` `README.md`到`Migirh-electron/libs/migirh-frontend`
8. 从`https://nodejs.org/dist/v17.3.0/node-v17.3.0-win-x64.zip`下载node二进制文件并解压到`Migirh-electron/libs/node`
9. 进入`Migirh-electron/libs/node`，将`node.exe`修改为`migirh-node.exe`。同时打开`npm.cmd`，将此脚本文件中的`node.exe`也都改为`migirh-node.exe`
（如果你愿意，可以给migirh-node.exe换个图标）
10. 在`Migirh-electron`目录下执行`npm run build`，启动构建。构建出的结果在`out`目录下。

## License

本版本库中的代码使用 《GNU 通用公共许可证第三版》进行许可。该许可证允许您自由修改、个人或公共使用、商业使用和再分发。但是，修改或使用此代码的作品必须使用相同的许可证（GPLv3）进行许可。

许可证的全文在[LICENSE](LICENSE)文件中。

The code in this repository is licensed under the GNU General Public License Version 3. This license allows you to freely modify, personal or public use, commercial use, and redistribution. However, works that modify or use this code must be licensed under the same (GPLv3) license.

Full text of the license is available in the [LICENSE](LICENSE) file.