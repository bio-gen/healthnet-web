// src/auth/index.js

import router from '@/router'

// URL and endpoint constants
const API_URL = 'http://healthnetz.herokuapp.com/v1/'
const LOGIN_URL = API_URL + 'auth/'
const SIGNUP_URL = API_URL + 'users/'

export default {

  // User object will let us check authentication status
  user: {
    id: -1,
    name: '',
    email: ''
  },

  postOptions: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  /**
   * @summary Send a request to the login URL and save the returned JWT
   * {
   *   email": "user@user.com",
   *   "password": "user123",
   *   "password_confirmation": "user123"
   * }
   */
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, this.postOptions).then(response => {
      context.loading = false
      var err = this.handleErrors(response.body)
      if (!err) {
        localStorage.setItem('id_token', response.body.auth_token)

        this.user.id = response.body.user.id
        this.user.name = response.body.user.email
        this.user.email = response.body.user.email
        localStorage.setItem('user', JSON.stringify(this.user))

        // Redirect to a specified route
        if (redirect) {
          router.push(redirect)
        }
      } else {
        context.error = err
      }
    }, response => {
      context.loading = false
      context.error = response.status + '-' + response.data
    })
  },

  /**
   * @summary Send a request to the signup URL and save the returned JWT
   * {
   *   "data": {
   *     "type": "users",
   *     "attributes": {
   *       "email": "user@user.com",
   *       "password": "user123",
   *       "password_confirmation": "user123"
   *     }
   *   }
   * }
   */
  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, this.postOptions).then(response => {
      context.loading = false
      var err = this.handleErrors(response.body)
      if (!err) {
        localStorage.setItem('id_token', response.body.auth_token)

        this.user.id = response.body.data.id
        this.user.name = response.body.data.attributes.email
        this.user.email = response.body.data.attributes.email
        localStorage.setItem('user', JSON.stringify(this.user))

        // Redirect to a specified route
        if (redirect) {
          router.push(redirect)
        }
      } else {
        context.error = err
      }
    }, response => {
      context.loading = false
      if (response.status === 422) {
        if (response.data.password_confirmation) {
          context.error = 'Passwords do not match.'
        } else if (response.data.email) {
          context.error = 'A user with this email already exists.'
        }
      } else {
        context.error = response.status + '-' + response.data
      }
    })
  },

  // To log out, we just need to remove the token and user info
  logout (redirect) {
    localStorage.removeItem('id_token')
    localStorage.removeItem('user')
    this.user.authenticated = false
    router.push(redirect)
  },

  authenticated () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      return true
    } else {
      return false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  },

  // Check for errors
  handleErrors (data) {
    if (data.errors) {
      return data.errors[0]
    }
  }
}
