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

  getEducationURL (userId, educationId) {
    var url = USER_URL + userId + '/' + 'educations/'
    if (educationId) {
      url += educationId + '/'
    }
    return url
  },

  getCertificatesURL (userId, certificateId) {
    var url = USER_URL + userId + '/' + 'certificates/'
    if (certificateId) {
      url += certificateId + '/'
    }
    return url
  },

  /**
   * @summary Get Work Experience list
   * @param {Object} context - The Vue component where this method is being called from
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
   *   "start_year": "2017",
   *   "end_year": "2018",
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
   *   "start_year": "2017",
   *   "end_year": "2017",
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
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} experienceId - The ID of the experience to delete
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  deleteExperience (context, userId, experienceId, successCallback) {
    var experienceURL = this.getExperienceURL(userId, experienceId)
    api.deleteEndpoint(context, experienceURL, successCallback)
  },

  /**
   * @summary Get Education list
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  getEducationList (context, userId, successCallback) {
    context.loading = true
    var educationURL = this.getEducationURL(userId)
    api.getEndpoint(context, educationURL, successCallback)
  },

  /**
   * @summary Create a new Education entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Object} data
   * {
   *   "degree": "Software Engineer",
   *   "school": "Harvard",
   *   "field": "Computer Science",
   *   "start_year": "2012",
   *   "end_year": "2013",
   *   "current": true,
   *   "description": "Education description"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  createEducation (context, userId, data, successCallback, errorCallback) {
    var educationURL = this.getEducationURL(userId)
    var fullData = {
      'data': {
        'type': 'educations',
        'attributes': data
      }
    }
    api.postEndpoint(context, educationURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Update an Education entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} educationId - The ID of the education to update
   * @param {Object} data
   * {
   *   "degree": "Software Engineer",
   *   "school": "Harvard",
   *   "field": "Computer Science",
   *   "start_year": "2012",
   *   "end_year": "2013",
   *   "current": true,
   *   "description": "Education description"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  updateEducation (context, userId, educationId, data, successCallback, errorCallback) {
    var educationURL = this.getEducationURL(userId, educationId)
    var fullData = {
      'data': {
        'type': 'educations',
        'attributes': data
      }
    }
    api.patchEndpoint(context, educationURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Delete Education entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} educationId - The ID of the education to delete
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  deleteEducation (context, userId, educationId, successCallback) {
    var educationURL = this.getEducationURL(userId, educationId)
    api.deleteEndpoint(context, educationURL, successCallback)
  },

  /**
   * @summary Get Certificates list
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  getCertificatesList (context, userId, successCallback) {
    context.loading = true
    var certificatesURL = this.getCertificatesURL(userId)
    api.getEndpoint(context, certificatesURL, successCallback)
  },

  /**
   * @summary Create a new Certificate entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Object} data
   * {
   *   "title": "Title",
   *   "granted_by": "AAA",
   *   "year": "2010"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  createCertificate (context, userId, data, successCallback, errorCallback) {
    var certificatesURL = this.getCertificatesURL(userId)
    var fullData = {
      'data': {
        'type': 'certificates',
        'attributes': data
      }
    }
    api.postEndpoint(context, certificatesURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Update a Certificate entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} certificateId - The ID of the certificate to update
   * @param {Object} data
   * {
   *   "title": "Title",
   *   "granted_by": "AAA",
   *   "year": "2010"
   * }
   * @callback successCallback - Callback function if operation succeeded (required)
   * @callback errorCallback - Callback function if operation failed
   */
  updateCertificate (context, userId, certificateId, data, successCallback, errorCallback) {
    var certificatesURL = this.getCertificatesURL(userId, certificateId)
    var fullData = {
      'data': {
        'type': 'certificates',
        'attributes': data
      }
    }
    api.patchEndpoint(context, certificatesURL, fullData, successCallback, errorCallback)
  },

  /**
   * @summary Delete Certificate entry
   * @param {Object} context - The Vue component where this method is being called from
   * @param {Number} userId - The ID of the user
   * @param {Number} certificateId - The ID of the certificate to delete
   * @callback successCallback - Callback function if operation succeeded (required)
   */
  deleteCertificate (context, userId, certificateId, successCallback) {
    var certificatesURL = this.getCertificatesURL(userId, certificateId)
    api.deleteEndpoint(context, certificatesURL, successCallback)
  }
}
