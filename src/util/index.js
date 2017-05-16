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
  }
}
