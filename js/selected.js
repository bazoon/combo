(function() {
  'use strict';

  
  
  module.exports = angular
    .module('logic.services', [])
    .factory('selectedFactory', selectedFactory);

  selectedFactory.$inject = ['$q', 'authorsStore', 'booksStore'];

  
  function selectedFactory ($q, authorsStore, booksStore) {

    var _currentAuthor = null;
    var _authors = null;
    var _books = null;

    var service = {
      activate: activate,
      getAuthors: getAuthors,
      setCurrentAuthor: setCurrentAuthor,
      getCurrentAuthor: getCurrentAuthor,
      getCurrentBooks: getCurrentBooks
    };

    function activate () {
      console.log('activate');
    }

    function getAuthors () {
      return authorsStore.getAuthors().then(function  (response) {
        _authors = response;
        setCurrentAuthor(_authors[0]);
        return _authors;
      });
    }
    
    function setCurrentAuthor (author) {
       _currentAuthor = author; 
    }

    function getCurrentAuthor () {
      return _currentAuthor;
    }

    function getCurrentBooks () {
      
      return booksStore.getBooks(1).then(function  (response) {
        _books = response;
        return _books;
      });


    }

    return service;

  }

}
)();
