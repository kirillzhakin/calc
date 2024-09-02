import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { MainPage } from '@/pages'
import { ROUTE_NAME } from '@/widgets'
const ConvertPage = () => import('@/pages/ConvertPage/ui/ConvertPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAME.MAIN,
    component: MainPage
  },
  {
    path: '/convert',
    name: ROUTE_NAME.CONVERT,
    component: ConvertPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
