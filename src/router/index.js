// src/router/index.js

import Router from 'vue-router'
import Index from '@/components/Index'
import SignUp from '@/components/SignUp'
import NotFoundComponent from '@/components/NotFoundComponent'
import Dashboard from '@/components/dashboard/Dashboard'
import Home from '@/components/dashboard/home/Home'
import Profile from '@/components/dashboard/profile/Profile'
import Meeting from '@/components/dashboard/meeting/Meeting'
import Inbox from '@/components/dashboard/inbox/Inbox'
import Notifications from '@/components/dashboard/notifications/Notifications'
import Settings from '@/components/dashboard/account/Settings'
import EditAccount from '@/components/dashboard/account/EditAccount'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        },
        {
          path: 'meeting',
          name: 'meeting',
          component: Meeting
        },
        {
          path: 'inbox',
          name: 'inbox',
          component: Inbox
        },
        {
          path: 'email',
          name: 'email',
          component: Profile
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: Notifications
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings
        },
        {
          path: 'edit-account',
          name: 'editAccount',
          component: EditAccount
        }
      ]
    },
    // Not found handler
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
