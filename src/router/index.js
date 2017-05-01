// src/router/index.js

import Router from 'vue-router'
import Index from '@/components/Index'
import SignUp from '@/components/SignUp'
import NotFoundComponent from '@/components/NotFoundComponent'
import Dashboard from '@/components/dashboard/Dashboard'
import Home from '@/components/dashboard/Home'
import Profile from '@/components/dashboard/Profile'
import Meeting from '@/components/dashboard/Meeting'
import Inbox from '@/components/dashboard/Inbox'
import Notifications from '@/components/dashboard/Notifications'
import Settings from '@/components/dashboard/Settings'
import Account from '@/components/dashboard/Account'

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
          path: 'account',
          name: 'account',
          component: Account
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
