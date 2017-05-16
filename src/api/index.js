// src/api/index.js
// Common API functions and attributes

export default {
  // URL and endpoint constants
  API_URL: 'http://healthnetz.herokuapp.com/v1/',

  GET_OPTIONS: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  POST_OPTIONS: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  DELETE_OPTIONS: {
    headers: {
      'Content-Type': 'application/json'
    }
  },

  errorMap: {
    404: 'Not found.',
    422: 'Data entry error'
  },

  /**
   * @summary log an HTTP error obtained from the server
   */
  logError (context, status, customErrorMap) {
    var errorMap = customErrorMap == null ? this.errorMap : customErrorMap
    var msg = ''
    if (errorMap.hasOwnProperty(status)) {
      msg = errorMap[status]
    } else {
      msg = 'There was an error processing your request (' + status + '). ' +
          'Please contact the system administrator.'
    }
    context.error = msg
    console.log(msg)
  },

  /**
   * @summary READ operation from API
   * @param context - The Vue component where this method is being called from
   * @param {String} url - The URL of the endpoint
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   * @param {Object} customErrorMap - An object mapping http error codes with text messages
   * Example:
   * {
   *   404: 'Not found',
   *   500: 'There was an error in the server.'
   * }
   */
  getEndpoint (context, url, successCallback, errorCallback, customErrorMap) {
    context.$http.get(url, this.GET_OPTIONS).then(response => {
      successCallback(response)  // Required
    }, response => {
      if (errorCallback) {
        errorCallback(response)
      } else {
        this.logError(context, response.status, customErrorMap)
      }
    })
  },

  /**
   * @summary POST operation from API
   * @param context - The Vue component where this method is being called from
   * @param {String} url - The URL of the endpoint
   * @param {Object} data - The data to send in the POST body
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   * @param {Object} customErrorMap - An object mapping http error codes with text messages
   * Example:
   * {
   *   404: 'Not found',
   *   500: 'There was an error in the server.'
   * }
   */
  postEndpoint (context, url, data, successCallback, errorCallback, customErrorMap) {
    context.$http.post(url, data, this.DELETE_OPTIONS).then(response => {
      successCallback(response)  // Required
    }, response => {
      if (errorCallback) {
        errorCallback(response)
      } else {
        this.logError(context, response.status, customErrorMap)
      }
    })
  },

  /**
   * @summary DELETE operation from API
   * @param context - The Vue component where this method is being called from
   * @param {String} url - The URL of the endpoint
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   * @param {Object} customErrorMap - An object mapping http error codes with text messages
   * Example:
   * {
   *   404: 'Not found',
   *   500: 'There was an error in the server.'
   * }
   */
  deleteEndpoint (context, url, successCallback, errorCallback, customErrorMap) {
    context.$http.delete(url, this.DELETE_OPTIONS).then(response => {
      successCallback(response)  // Required
    }, response => {
      if (errorCallback) {
        errorCallback(response)
      } else {
        this.logError(context, response.status, customErrorMap)
      }
    })
  }
}
