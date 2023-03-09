# ui-admin

## 介绍

基于[`vue-element-plus-admin-1.9.4`](https://gitee.com/kailong110120130/vue-element-plus-admin)，参考[yudao-ui-admin-vue3-1.7.1](https://gitee.com/yudaocode/yudao-ui-admin-vue3)，进行二次开发的管理端后台。

- **最新技术栈**：使用 Vue3、Vite4 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**: 可配置的主题
- **国际化**：内置完善的国际化方案
- **权限**：内置完善的动态路由权限生成方案
- **组件**：二次封装了多个常用的组件
- **示例**：内置丰富的示例

## 技术栈

| 框架                                                                   | 说明               | 版本     |
|:---------------------------------------------------------------------|:-----------------|:-------|
| [Vue](https://staging-cn.vuejs.org/)                                 | Vue 框架           | 3.2.47 |
| [Vite](https://cn.vitejs.dev//)                                      | 开发与构建工具          | 4.1.1  |
| [Element Plus](https://element-plus.org/zh-CN/)                      | Element Plus     | 2.2.30 |
| [TypeScript](https://www.typescriptlang.org/docs/)                   | JavaScript 的超集   | 4.9.5  |
| [pinia](https://pinia.vuejs.org/)                                    | Vue 存储库 替代 vuex5 | 2.0.30 |
| [vueuse](https://vueuse.org/)                                        | 常用工具集            | 9.12.0 |
| [vxe-table](https://vxetable.cn/)                                    | Vue 最强表单         | 4.3.10 |
| [vue-i18n](https://kazupon.github.io/vue-i18n/zh/introduction.html/) | 国际化              | 9.2.2  |
| [vue-router](https://router.vuejs.org/)                              | Vue 路由           | 4.1.6  |
| [windicss](https://cn.windicss.org/)                                 | 下一代工具优先的 CSS 框架  | 3.5.6  |
| [iconify](https://icon-sets.iconify.design/)                         | 在线图标库            | 3.0.1  |
| [wangeditor](https://www.wangeditor.com/)                            | 富文本编辑器           | 5.1.23 |

## 开发工具

推荐 VS Code 开发，配合插件如下：

| 插件名                           | 功能                       |
|-------------------------------|--------------------------|
| TypeScript Vue Plugin (Volar) | 用于 TypeScript 的 Vue 插件   |
| Vue Language Features (Volar) | Vue3.0 语法支持              |
| WindiCSS IntelliSense         | 自动完成、语法突出显示、代码折叠和构建等高级功能 |
| Iconify IntelliSense          | Iconify 预览和搜索            |
| i18n Ally                     | 国际化智能提示                  |
| Stylelint                     | Css    格式化               |
| Prettier                      | 代码格式化                    |
| ESLint                        | 脚本代码检查                   |
| DotENV                        | env 文件高亮                 |

## 前序准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) - 项目开发环境
- [Vite4](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.org/) - element-plus 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 演示和参考

- [vue-element-plus-admin演示](https://element-plus-admin.cn/)
- [vue-element-plus-admin文档](https://element-plus-admin-doc.cn/)
- [yudao-ui-admin-vue3演示](http://dashboard.yudao.iocoder.cn)
- [yudao-ui-admin-vue3文档](https://doc.iocoder.cn/quick-start/)

## 安装和使用

- 获取代码：`git clone https://github.com/youyouzh/ui-admin.git`
- 安装yarn: `npm install yarn -g`
- 安装依赖: `yarn install`
- 运行: `yarn run dev`
- 打包: `yarn run build:pro`

## 如何贡献

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat` 新功能
- `fix` 修补 bug
- `docs` 文档
- `style` 格式、样式(不影响代码运行的变动)
- `refactor` 重构(即不是新增功能，也不是修改 BUG 的代码)
- `perf` 优化相关，比如提升性能、体验
- `test` 添加测试
- `build` 编译相关的修改，对项目构建或者依赖的改动
- `ci` 持续集成修改
- `chore` 构建过程或辅助工具的变动
- `revert` 回滚到上一个版本
- `workflow` 工作流改进
- `mod` 不确定分类的修改
- `wip` 开发中
- `types` 类型
