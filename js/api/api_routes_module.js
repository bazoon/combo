(function() {
  'use strict';

  var config = require("./api_config");

  module.exports = {

    authorsPath: function () {
      return apiPoint("authors");
    },

    booksPath: function (authorId) {
      return apiPoint("books", authorId);
    }


   };

  function apiPoint () {
    var args = Array.prototype.slice.call(arguments);
    return config.apiServer + args.join("/");
  }


})();
