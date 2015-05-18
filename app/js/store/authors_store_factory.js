(function() {
  'use strict';

  require("../api/authors_api_factory");

  module.exports = angular
    .module('store.services')
    .factory('authorsStore', authorsStore);

  authorsStore.$inject = ['$q', 'authorsApiFactory', '$cacheFactory'];


  function authorsStore ($q, authorsApiFactory, $cacheFactory) {

    var cache = $cacheFactory('cache');

    var service = {
      getAuthors: getAuthors
    };

    return service;

    // //////////

    function getAuthors () {
      var authors = cache.get('authors');

      if (authors) {
        return $q.when(authors);
      } else {
        return authorsApiFactory.getAuthors().then(getAuthorsSuccess);
      }

      function getAuthorsSuccess (response) {
        cache.put('authors', response.data);
        return response.data;
      }

    }

  }

}
)();
