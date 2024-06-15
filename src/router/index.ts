import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AdminView from '@/views/AdminView.vue'
import SavedProjects from "@/views/SavedProjects1.vue";
import DraggableConteiner1 from '@/components/DraggableContainer.vue'
import DragTest from "@/views/DragTest.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/drag',
      name: 'darg',
      component: DragTest
    },
    {
      path: '/saved_projects',
      name: 'saved_projects',
      component: SavedProjects
    },
  ]
})

export default router
