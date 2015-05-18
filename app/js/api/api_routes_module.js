(function() {
  'use strict';

  var config = require("./api_config");

  module.exports = {
    authorsPath: authorsPath,
    booksPath: booksPath
   };

   // /////////

  function authorsPath () {
    return apiPoint("authors");
  }

  function booksPath (authorId) {
    return apiPoint("books", authorId);
  }

  function apiPoint () {
    var args = Array.prototype.slice.call(arguments);
    return config.apiServer + args.join("/");
  }


})();
