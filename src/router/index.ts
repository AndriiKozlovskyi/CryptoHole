import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ManagmentView from '@/views/ManagmentView.vue'
import GuidesView from '@/views/GuidesView.vue'
import NewsView from '@/views/NewsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AuthManager from '@/manager/auth_manager'
import BasicLayout from '@/views/BasicLayout.vue'
import EventDescriptionView from '@/views/EventDescriptionView.vue'
import CalendarView from '@/views/CalendarView.vue'
import TagManager from '@/manager/tag_manager'
import EventManager from '@/manager/event_manager'
import SavedEventManager from '@/manager/saved_event_manager'
import SavedEventInfoView from '@/views/SavedEventInfoView.vue'
import EditingCalendarEventView from '@/views/EditingCalendarEventView.vue'
import CreationCalendarEventView from '@/views/CreationCalendarEventView.vue'

import AdminLayout from '@/views/AdminLayout.vue'
import AdminView from '@/views/AdminView.vue'
import CreateEvent from '@/components/admin_components/CreateEvent.vue'
import AdminEventDescriptionView from '@/views/AdminEventDescriptionView.vue'

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
          component: ManagmentView,
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: CalendarView,
          children: [
            {
              path: ':id/edit_calendar_event',
              name: 'edit_calendar_event',
              component: EditingCalendarEventView,
              props: true
            },
            {
              path: 'create_calendar_event',
              name: 'create_calendar_event',
              component: CreationCalendarEventView,
            },
          ]
        },
        {
          path: ':id/event_description',
          name: 'event_description',
          component: EventDescriptionView,
          props: true
        },
       
      ],
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
        await EventManager.loadAll()
        await SavedEventManager.loadAll()
      }
    },
    {
      path: '/:id/event_info',
      name: 'event_info',
      component: SavedEventInfoView,
      props: true,
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
        await EventManager.loadAll()
        await SavedEventManager.loadAll()
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: 'event_management',
          name: 'event_management',
          component: AdminView,
          children: [ 
            {
              path: ':id/event_description',
              name: 'admin_event_description',
              component: AdminEventDescriptionView,
              props: true
            },
            {
              path: 'create_event',
              name: 'create_event',
              component: CreateEvent
            },
          ]
          
        },
      ],
      beforeEnter: async (to) => {
        if (!(await AuthManager.isTokenValid()) && to.path !== '/auth/login') {
          return { name: 'login' }
        }
        await EventManager.loadAll()
        await SavedEventManager.loadAll()
        await TagManager.loadAll()
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
    }
  ]
})

export default router
