import { createRouter, createWebHistory } from 'vue-router'
import SpeciesView from '@/views/SpeciesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SpeciesView
    },
  ]
})

export default router
