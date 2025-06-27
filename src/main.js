import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 注意后缀改为 .mjs
// 引入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建Vue应用
const app = createApp(App)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
  size: 'medium', // 全局组件尺寸
  zIndex: 3000    // 全局z-index
})

// 全局配置
app.config.globalProperties.$ELEMENT = {
  size: 'medium',
  zIndex: 3000
}

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err, info)
  // 可以在这里添加错误上报逻辑
}

// 挂载应用
app.mount('#app')

// 开发环境打印信息
if (import.meta.env.DEV) {
  console.log('当前运行环境: 开发环境')
  console.log('Vue版本:', app.version)
}
