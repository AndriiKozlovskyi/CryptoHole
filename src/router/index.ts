import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AdminView from '@/views/AdminView.vue'
import SavedProjects from "@/views/SavedProjects.vue";
import DraggableConteiner1 from '@/components/DraggableContainer.vue'
import ProjectDescriptionView from '@/views/ProjectDescriptionView.vue';
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
      path: '/saved_projects',
      name: 'saved_projects',
      component: SavedProjects
    },
    {
      path: '/:name/project_description',
      name: 'project_description',
      component: ProjectDescriptionView
    },
  ]
})

export default router
