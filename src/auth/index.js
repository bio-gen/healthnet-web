// src/auth/index.js

import router from '@/router'
import api from '@/api'
import jwtDecode from 'jwt-decode'

// URL and endpoint constants
const LOGIN_URL = api.API_URL + 'auth/'
const USER_URL = api.API_URL + 'users/'

export default {

  getUserURL (userId) {
    var url = USER_URL
    if (userId) {
      url += userId + '/'
    }
    return url
  },

  user: {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    location: '',
    institution: '',
    dateOfBirth: '',
    phoneNumber: '',
    authenticated: false,

    clear () {
      this.id = -1
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.title = ''
      this.location = ''
      this.institution = ''
      this.dateOfBirth = ''
      this.phoneNumber = ''
      this.authenticated = false
    },

    setUserArgs (id, firstName, lastName, email, title, location, institution,
        dateOfBirth, phoneNumber, authenticated) {
      this.id = id
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.title = title
      this.location = location
      this.institution = institution
      this.dateOfBirth = dateOfBirth
      this.phoneNumber = phoneNumber
      this.authenticated = authenticated
    },

    setUser (user) {
      this.id = user.id
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.email = user.email
      this.title = user.title
      this.location = user.location
      this.institution = user.institution
      this.dateOfBirth = user.dateOfBirth
      this.phoneNumber = user.phoneNumber
      this.authenticated = user.authenticated
    },

    updateUser (data) {
      this.firstName = data.first_name
      this.lastName = data.last_name
      this.title = data.title
      this.location = data.location
      this.institution = data.institution
      this.dateOfBirth = data.date_of_birth
      this.phoneNumber = data.phone_number
    }
  },

  /**
   * @summary Creates a test user variable in case the server is down.
   * This will only work in development mode.
   */
  forceUserLogin (redirect) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Forcing user login...')
      this.user.setUserArgs(0, 'Test', 'Test', 'test@test.com', 'Test', 'Test', 'Test',
          '2017-01-01', '(123) 456-7890', true)
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('jwt', 'test')

      if (redirect) {
        router.push(redirect)
      }
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
        response.body.data.attributes.title,
        response.body.data.attributes.location,
        response.body.data.attributes.institution,
        response.body.data.attributes.date_of_birth,
        response.body.data.attributes.phone_number,
        true
      )
      localStorage.setItem('user', JSON.stringify(this.user))

      context.loading = false
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
        this.forceUserLogin(redirect)
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
        this.forceUserLogin(redirect)
      }
    }).then(decodedJWT => {
      if (decodedJWT) {
        var userId = decodedJWT.sub
        this.getUser(context, userId, redirect)
      }
    })
  },

  /**
   * @summary Create a new User
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Object} data - The data (credentials) required for signup
   * {
   *   "first_name": "First",
   *   "last_name": "Last",
   *   "email": "user@user.com",
   *   "password": "user123",
   *   "password_confirmation": "user123"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  signup (context, data, successCallback, errorCallback) {
    var userURL = this.getUserURL()
    var fullData = {
      'data': {
        'type': 'users',
        'attributes': data
      }
    }
    api.postEndpoint(context, userURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Update User information
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Object} data
   * {
   *   "first_name": "First",
   *   "last_name": "Last",
   *   "email": "user@user.com",
   *   "password": "user123",
   *   "password_confirmation": "user123"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  updateUser (context, userId, data, successCallback, errorCallback) {
    var userURL = this.getUserURL(userId)
    var fullData = {
      'data': {
        'type': 'users',
        'attributes': data
      }
    }
    api.patchEndpoint(context, userURL, fullData,
        (response) => {
          this.user.updateUser(data)
          localStorage.setItem('user', JSON.stringify(this.user))
          successCallback(response)
        },
        errorCallback)
  },

  /**
   * @summary Log the user out.
   * To log out, we just need to remove the token and user info.
   * @param {String} redirect - A route to redirect to after a successful call
   * @callback onComplete - Callback function if operation succeeded (required)
   */
  logout (redirect, onComplete) {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    this.user.clear()
    if (redirect) {
      router.push(redirect, onComplete)
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
