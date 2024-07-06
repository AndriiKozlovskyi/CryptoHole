import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AdminView from '@/views/AdminView.vue'
import Managment from '@/views/Managment.vue'
import GuidesView from '@/views/GuidesView.vue'
import NewsView from '@/views/NewsView.vue'
import CreateProject from '@/components/admin_components/CreateProject.vue'
import ProjectDescriptionAdminView from '@/views/ProjectDescriptionAdminView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AuthManager from '@/manager/auth_manager'
import BasicLayout from "@/views/BasicLayout.vue";
import ProjectManager from '@/manager/project_manager'
import SavedProjectManager from '@/manager/saved_project_manager'
import ProjectDescriptionView from '@/views/ProjectDescriptionView.vue'
import CalendarView from '@/views/CalendarView.vue'
import TagManager from '@/manager/tag_manager'
import EventManager from '@/manager/event_manager'
import SavedEventManager from '@/manager/saved_event_manager'

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
      path: '/home',
      name: 'home',
      component: BasicLayout,
      children: [
        {
          path: 'events',
          name: 'events',
          component: MainView
        },
        {
          path: 'managment',
          name: 'managment',
          component: Managment
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: CalendarView
        },
        {
          path: ':name/project_description',
          name: 'project_description',
          component: ProjectDescriptionView,
          props: true,
        },
      ],
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
        await EventManager.loadAll();
        await SavedEventManager.loadAll();
      }
    },
    {
      path: "/admin",
      name: "admin",
      children: [
        {
          path: "",
          name: "base_admin",
          component: AdminView,
        },
        {
          path: 'create_project',
          name: 'create_project',
          component: CreateProject
        },
        {
          path: ':name/project_description',
          name: 'admin_project_description',
          component: ProjectDescriptionAdminView
        },
      ],
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
        await ProjectManager.loadAll();
        await SavedProjectManager.loadAll();
        await TagManager.loadAll();
      }
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
    
  ]
})

export default router
