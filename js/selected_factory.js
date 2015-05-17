(function() {
  'use strict';



  module.exports = angular
    .module('logic.services', [])
    .factory('selectedFactory', selectedFactory);

  selectedFactory.$inject = ['$q', 'authorsStore', 'booksStore'];


  function selectedFactory ($q, authorsStore, booksStore) {


    var service = {
      activate: activate,
      getAuthors: getAuthors,
      authorChanged: authorChanged,
      getCurrentBooks: getCurrentBooks,
      randomSelect: randomSelect,
      hint: hint
    };

    function activate () {
      getAuthors().then(getCurrentBooks);
    }

    function getAuthors () {
      return authorsStore.getAuthors().then(function (response) {
        service.authors = response;
        service.author = service.authors[0];
        return service.authors;
      });
    }


    function getCurrentBooks () {
      return booksStore.getBooks(service.author.id).then(function (response) {
        service.books = response;
        return service.books;
      });
    }

    function authorChanged () {
      service.book = undefined;
      getCurrentBooks();
    }

      function randomSelect () {
        var randomAuthor = service.authors[Math.floor(Math.random() * service.authors.length)];
        service.author = randomAuthor;
        getCurrentBooks().then(function () {
          service.book = service.books[Math.floor(Math.random() * service.books.length)];
        });
      }

      function hint () {

        if ((service.author === undefined) && (service.book === undefined)) {
          return 'Выберите автора';
        }

        if ((service.author != undefined) && (service.book === undefined)) {
          return 'Выберите книгу';
        }

        return service.author.name + ' написал "' + service.book.name + '"';

    }


    return service;

  }

}
)();