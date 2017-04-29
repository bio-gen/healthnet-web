// src/index.js

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from '@/auth'
import VueResource from 'vue-resource'
import Router from 'vue-router'

Vue.use(VueResource)
Vue.use(Router)

Vue.config.productionTip = false

Vue.http.options.xhr = {withCredentials: true}
Vue.http.options.emulateJSON = true

Vue.http.headers.common['Authorization'] = auth.getAuthHeader()['Authorization']

auth.checkAuth()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
