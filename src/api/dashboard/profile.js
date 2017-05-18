// src/auth/index.js

// import router from '@/router'
import api from '@/api'
// import auth from '@/auth'

// URL and endpoint constants
const USER_URL = api.API_URL + 'users/'

export default {

  getExperienceURL (userId, experienceId) {
    var url = USER_URL + userId + '/' + 'work_experiences/'
    if (experienceId) {
      url += experienceId + '/'
    }
    return url
  },

  /**
   * @summary Get Work Experience list
   * @param context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  getExperienceList (context, userId, successCallback) {
    context.loading = true
    var experienceURL = this.getExperienceURL(userId)
    api.getEndpoint(context, experienceURL, successCallback)
  },

  /**
   * @summary Create a new Work Experience entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Object} data
   * {
   *   "title": "Software Engineer",
   *   "company": "Apple",
   *   "location": "USA",
   *   "start_date": "2017-05-08",
   *   "end_date": "2017-05-08",
   *   "current": true,
   *   "description": "Job description"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  createExperience (context, userId, data, successCallback, errorCallback) {
    var experienceURL = this.getExperienceURL(userId)
    var fullData = {
      'data': {
        'type': 'work_experiences',
        'attributes': data
      }
    }
    api.postEndpoint(context, experienceURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Update a Work Experience entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} experienceId - The ID of the experience to update
   * @param {Object} data
   * {
   *   "title": "Software Engineer",
   *   "company": "Apple",
   *   "location": "USA",
   *   "start_date": "2017-05-08",
   *   "end_date": "2017-05-08",
   *   "current": true,
   *   "description": "Job description"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  updateExperience (context, userId, experienceId, data, successCallback, errorCallback) {
    var experienceURL = this.getExperienceURL(userId, experienceId)
    var fullData = {
      'data': {
        'type': 'work_experiences',
        'attributes': data
      }
    }
    api.patchEndpoint(context, experienceURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Delete Work Experience entry
   * @param context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} experienceId - The ID of the experience to delete
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  deleteExperience (context, userId, experienceId, successCallback) {
    var experienceURL = this.getExperienceURL(userId, experienceId)
    api.deleteEndpoint(context, experienceURL, successCallback)
  }
}
