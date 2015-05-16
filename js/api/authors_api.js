(function() {
  'use strict';

  var routes = require("./api_routes");
  
  module.exports = angular
    .module('api.services')
    .factory('authorsApiFactory', authorsApiFactory);

  authorsApiFactory.$inject = ['$q', 'apiFactory'];

  
  function authorsApiFactory ($q, apiFactory) {

    var service = {
      getAuthors: getAuthors
    };

    return service;

    function getAuthors (argument) {
      return apiFactory.get(routes.authorsPath());
    }

  }

}
)();
