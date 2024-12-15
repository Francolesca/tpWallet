import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TransactionView from '@/views/TransactionView.vue'
import HistoryView from '@/views/HistoryView.vue'
import CurrentAnalysisView from '@/views/CurrentAnalysisView.vue'
import InvestmentAnalysisView from '@/views/InvestmentAnalysisView.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: TransactionView
  },
  {
    path: '/current',
    name: 'current',
    component: CurrentAnalysisView
  },
  {
    path: '/investment',
    name: 'investment',
    component: InvestmentAnalysisView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = store.state.user;
  if ( to.path !== '/' && !user){
    next('/');
  } else {
    next();
  }
})

export default router
