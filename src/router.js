import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './pages/Homepage.vue'
import AdvancedSearchPage from './pages/AdvancedSearchPage.vue'
import ApartmentDetailPage from './pages/ApartmentDetailPage.vue'

const routes = [
  { path: '/', component: Homepage },
  { path: '/advanced-search', component: AdvancedSearchPage },
  { path: '/apartment/:id', component: ApartmentDetailPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

