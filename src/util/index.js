// src/util/index.js

// Import required modules
var $ = require('jquery')
global.jQuery = require('jquery')
window.$ = $
var bootstrap = require('bootstrap')
var bootbox = require('bootbox')
console.log(bootstrap)

export default {
  confirmDialog (title, message, size, acceptFunction) {
    bootbox.confirm({
      title: title,
      message: message,
      buttons: {
        cancel: {
          label: 'Cancel'
        },
        confirm: {
          label: 'Confirm'
        }
      },
      size: size,
      callback: function (confirm) {
        if (confirm) {
          acceptFunction()
        }
      }
    })
  },

  /**
   * @summary Creates an array from a range of numbers between from (inclusive) and
   * from + size (non-inclusive)
   * @param {Number} from - Lower bound (inclusive)
   * @param {Number} size - Size of the array
   * @return {Oject} An array filled with numbers in the specified range
   */
  range (from, size) {
    return Array.from(new Array(size), (x, i) => i + from)
  },

  /**
   * @summary Get the current year yyyy. The optional parameter 'before' gets the current year
   * minus this value.
   * @param {Number} before - A number of years before the current year
   * @return {Number} The current year
   */
  currentYear (before) {
    var year = new Date().getFullYear()
    if (before) {
      year -= before
    }
    return year
  }
}
