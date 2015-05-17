(function() {
  'use strict';
  var routes = require("./api_routes_module");

  module.exports = angular
    .module('api.services')
    .factory('authorsApiFactory', authorsApiFactory);

  authorsApiFactory.$inject = ['apiFactory'];


  function authorsApiFactory (apiFactory) {

    var service = {
      getAuthors: getAuthors
    };

    return service;

    function getAuthors () {
      return apiFactory.get(routes.authorsPath());
    }

  }

}
)();
