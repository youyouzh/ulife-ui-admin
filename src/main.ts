// 引入windi css
import '@/plugins/windi.css'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入 element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.scss'

// 引入动画
import '@/plugins/animate.css'

// 路由
import router, { setupRouter } from '@/router'

// 权限
import { setupAuth } from '@/directives'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

import { isDevMode } from '@/utils/env'

import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/github.css' //导入代码高亮样式  新版

import '@/plugins/tongji' // 百度统计

import Logger from '@/utils/Logger'

// 本地开发模式 全局引入 element-plus 样式，加快第一次进入速度
if (isDevMode()) {
  import('element-plus/dist/index.css')
}

// 创建实例
const setupAll = async () => {
  const app = createApp(App)

  //自定义一个代码高亮指令
  app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('code')
    blocks.forEach((block: any) => {
      hljs.highlightElement(block)
    })
  })

  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  setupAuth(app)

  await router.isReady()

  app.mount('#app')
}

setupAll()

Logger.prettyPrimary(`欢迎使用`, import.meta.env.VITE_APP_TITLE)
