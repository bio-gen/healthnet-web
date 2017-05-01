// src/auth/index.js

import router from '@/router'

// URL and endpoint constants
const API_URL = 'http://healthnetz.herokuapp.com/v1/'
const LOGIN_URL = API_URL + 'auth/'
const SIGNUP_URL = API_URL + 'users/'
const UPDATE_USER_URL = API_URL + 'users/'

export default {

  user: {
    id: '',
    name: '',
    email: '',
    authenticated: false,

    clear () {
      this.id = ''
      this.name = ''
      this.email = ''
      this.authenticated = false
    },

    setUserArgs (id, name, email, authenticated) {
      this.id = id
      this.name = name
      this.email = email
      this.authenticated = authenticated
    },

    setUser (user) {
      this.id = user.id
      this.name = user.name
      this.email = user.email
      this.authenticated = user.authenticated
    }
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

        this.user.setUserArgs(
          response.body.user.id,
          response.body.user.email,
          response.body.user.email,
          true
        )
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
      if (response.status === 500) {
        context.error = 'User does not exist'
      } else {
        context.error = response.status + '-' + response.data
      }
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

        this.user.setUserArgs(
          response.body.user.id,
          response.body.user.email,
          response.body.user.email,
          true
        )
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
    this.user.clear()
    router.push(redirect)
  },

  /**
   * @summary Send a request to the update user URL
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
  updateUser (context, userId, creds) {
    var url = UPDATE_USER_URL + userId
    context.$http.put(url, creds, this.postOptions).then(response => {
      context.loading = false
      var err = this.handleErrors(response.body)
      if (!err) {
        context.successMsg = 'User information updated successfully.'
      } else {
        context.error = err
      }
    }, response => {
      context.loading = false
      if (response.status === 422) {
        if (response.data.password_confirmation) {
          context.error = 'Passwords do not match.'
        }
      } else {
        context.error = response.status + '-' + response.data
      }
    })
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt == null) {
      this.user.clear()
    } else {
      this.user.setUser(JSON.parse(localStorage.getItem('user')))
    }
  },

  // authenticated () {
  //   var jwt = localStorage.getItem('id_token')
  //   if (jwt == null) {
  //     return false
  //   } else {
  //     return true
  //   }
  // },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  },

  // Get logged user object
  // getUser () {
  //   return JSON.parse(localStorage.getItem('user'))
  // },

  // Check for errors
  handleErrors (data) {
    if (data.errors) {
      return data.errors[0]
    }
  }
}
