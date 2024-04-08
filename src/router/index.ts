import { createRouter, createWebHistory } from 'vue-router'
import SpeciesView from '@/views/SpeciesView.vue'
import SpecieView from '@/views/SpecieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SpeciesView
    },
    {
      path: '/species/:id',
      component: SpecieView
    }
  ]
})

export default router
