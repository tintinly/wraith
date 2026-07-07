import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    meta: { 
      layout: 'default',
      title: '个人页面' 
    }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})