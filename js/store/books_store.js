(function() {
  'use strict';

  
  
  module.exports = angular
    .module('store.services')
    .factory('booksStore', booksStore);

  booksStore.$inject = ['$q', 'booksApiFactory', '$cacheFactory'];

  
  function booksStore ($q, booksApiFactory, $cacheFactory) {

    var cache = $cacheFactory('mycache');

    var service = {
      getBooks: getBooks
    };

    function getBooks (authorId) {
      var deferred = $q.defer();
      var books = cache.get('books' + authorId);
      
      if (books) {
        return deferred.resolve(books).promise;  
      } else {
        return booksApiFactory.getBooks(authorId).then(getBooksSuccess);
      }

      function getBooksSuccess (response) {
        cache.put('books', response.data);
        console.log('getBooksSuccess', response.data);
        return response.data;
      }

    }



    return service;

  }

}
)();
