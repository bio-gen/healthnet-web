// src/auth/index.js

import router from '@/router'
import api from '@/api'
import jwtDecode from 'jwt-decode'

// URL and endpoint constants
const LOGIN_URL = api.API_URL + 'auth/'
const USER_URL = api.API_URL + 'users/'

export default {

  user: {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    authenticated: false,

    clear () {
      this.id = -1
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.authenticated = false
    },

    setUserArgs (id, firstName, lastName, email, authenticated) {
      this.id = id
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.authenticated = authenticated
    },

    setUser (user) {
      this.id = user.id
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.email = user.email
      this.authenticated = user.authenticated
    }
  },

  getOptions: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  postOptions: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  /**
   * @summary Get a user Object from API
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user to fetch
   * @param {String} redirect - A route to redirect to after a successful call
   */
  getUser (context, userId, redirect) {
    context.$http.get(USER_URL + userId, this.getOptions).then(response => {
      this.user.setUserArgs(
        userId,
        response.body.data.attributes.first_name,
        response.body.data.attributes.last_name,
        response.body.data.attributes.email,
        true
      )
      localStorage.setItem('user', JSON.stringify(this.user))

      if (redirect) {
        router.push(redirect)
      }
    }, response => {
      if (response.status === 404) {
        context.error = 'User not found.'
      } else {
        context.error = 'There was an error processing your request (' +
            response.status + ' - ' + response.data + '). Please contact the ' +
            'system administrator.'
      }
    })
  },

  /**
   * @summary Send a request to the login URL and save the returned JWT
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Object} creds - The credentials for login
   * "auth": {
   *   "email": "user@user.com",
   *   "password": "user123"
   * }
   * @param {String} redirect - A route to redirect to after a successful call
   */
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, this.postOptions).then(response => {
      context.loading = false

      localStorage.setItem('jwt', response.body.jwt)
      var decodedJWT = jwtDecode(response.body.jwt)

      return decodedJWT
    }, response => {
      context.loading = false
      if (response.status === 404) {
        context.error = 'Invalid user/password.'
      } else {
        context.error = 'There was an error processing your request (' +
            response.status + ' - ' + response.data + '). Please contact the ' +
            'system administrator.'
      }
    }).then(decodedJWT => {
      if (decodedJWT) {
        var userId = decodedJWT.sub
        this.getUser(context, userId, redirect)
      }
    })
  },

  /**
   * @summary Send a request to the signup URL and save the returned JWT
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Object} creds - The credentials for login
   * {
   *   "data": {
   *     "type": "users",
   *     "attributes": {
   *       "first_name": "First",
   *       "last_name": "Last",
   *       "email": "user@user.com",
   *       "password": "user123",
   *       "password_confirmation": "user123"
   *     }
   *   }
   * }
   * @param {String} redirect - A route to redirect to after a successful call
   */
  signup (context, creds, redirect) {
    context.$http.post(USER_URL, creds, this.postOptions).then(response => {
      context.loading = false
      // Redirect to a specified route
      if (redirect) {
        router.push(redirect)
      }
    }, response => {
      context.loading = false
      if (response.status === 422) {
        if (response.data.password_confirmation) {
          context.error = 'Passwords do not match.'
        } else if (response.data.email) {
          context.error = 'A user with this email already exists.'
        } else {

        }
      } else {
        context.error = 'There was an error processing your request (' +
            response.status + ' - ' + response.data + '). Please contact the ' +
            'system administrator.'
      }
    })
  },

  /**
   * @summary Log the user out.
   * To log out, we just need to remove the token and user info
   * @param {String} redirect - A route to redirect to after a successful call
   */
  logout (redirect) {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    this.user.clear()
    if (redirect) {
      router.push(redirect)
    }
  },

  /**
   * @summary Check if the user is authenticated and update the user data.
   * @return true if authenticated, false otherwise
   */
  checkAuth () {
    var jwt = localStorage.getItem('jwt')
    var user = localStorage.getItem('user')
    if (jwt == null || user == null) {
      this.logout()
      return false
    } else {
      this.user.setUser(JSON.parse(localStorage.getItem('user')))
      return true
    }
  },

  /**
   * @summary Get the authenticated header with the JWT. The object must be
   * passed for all authenticated requests.
   * @return {String} A formatted Authorization header with the JWT
   */
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
  }
}
