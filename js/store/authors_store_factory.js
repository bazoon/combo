(function() {
  'use strict';



  module.exports = angular
    .module('store.services')
    .factory('authorsStore', authorsStore);

  authorsStore.$inject = ['$q', 'authorsApiFactory', '$cacheFactory'];


  function authorsStore ($q, authorsApiFactory, $cacheFactory) {

    var cache = $cacheFactory('cache');

    var service = {
      getAuthors: getAuthors
    };

    function getAuthors () {
      var authors = cache.get('authors');

      if (authors) {
        var defer = $q.defer();
        defer.resolve(authors)
        return defer.promise;
      } else {
        return authorsApiFactory.getAuthors().then(getAuthorsSuccess);
      }

      function getAuthorsSuccess (response) {
        cache.put('authors', response.data);
        return response.data;
      }

    }





    return service;

  }

}
)();
