import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import DefaultLayout from './layouts/default.vue'

const app = createApp(App)
app.use(router)
// 布局组件需在 main.ts 中全局注册
app.component('default-layout', DefaultLayout)
app.mount('#app')
