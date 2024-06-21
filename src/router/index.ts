import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AdminView from '@/views/AdminView.vue'
import SavedProjects from '@/views/SavedProjects.vue'
import ProjectDescriptionView from '@/views/ProjectDescriptionView.vue'
import GuidesView from '@/views/GuidesView.vue'
import NewsView from '@/views/NewsView.vue'

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
      path: '/guides',
      name: 'guides',
      component: GuidesView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/:name/project_description',
      name: 'project_description',
      component: ProjectDescriptionView
    }
  ]
})

export default router
