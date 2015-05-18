(function() {
  'use strict';

  var routes = require("./api_routes_module");
  require("../api/api_factory");

  module.exports = angular
    .module('api.services')
    .factory('booksApiFactory', booksApiFactory);

  booksApiFactory.$inject = ['$q', 'apiFactory'];


  function booksApiFactory ($q, apiFactory) {

    var service = {
      getBooks: getBooks
    };

    return service;

    // //////////

    function getBooks (authorId) {
      return apiFactory.get(routes.booksPath(authorId));
    }

  }

}
)();
