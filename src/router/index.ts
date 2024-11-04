import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { MainPage } from '@/pages'
import { ROUTE_NAME } from '@/widgets'
const ResultPage = () => import('@/pages/ResultPage/ui/ResultPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAME.MAIN,
    component: MainPage
  },
  {
    path: '/result',
    name: ROUTE_NAME.RESULT,
    component: ResultPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
