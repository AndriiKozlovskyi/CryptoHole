import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AdminView from '@/views/AdminView.vue'
import SavedProjects from '@/views/SavedProjects.vue'
import ProjectDescriptionView from '@/views/ProjectDescriptionView.vue'
import GuidesView from '@/views/GuidesView.vue'
import NewsView from '@/views/NewsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AuthManager from '@/manager/auth_manager'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component: MainView,
      children: [
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
        },
      ],
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
      }
    },
  ]
})

export default router
