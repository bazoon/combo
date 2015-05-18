(function() {
  'use strict';

  require("./store/authors_store_factory");
  require("./store/books_store_factory");


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

    return service;


    // /////////////
    function activate () {
      getAuthors().then(getCurrentBooks);
    }

    function getAuthors () {
      return authorsStore.getAuthors().then(getAuthorsSuccess, getAuthorsFailed);

      function getAuthorsSuccess (response) {
        service.authors = response;
        service.author = service.authors[0];
        clearError();
        return service.authors;
      }

      function getAuthorsFailed () {
        service.error = "Ошибка загрузки авторов";
      }

    }


    function getCurrentBooks () {
      return booksStore.getBooks(service.author.id).then(getBooksSuccess, getBooksFailed);

      function getBooksSuccess (response) {
        service.books = response;
        clearError();
        return service.books;
      }

      function getBooksFailed () {
        service.error = "Ошибка загрузки книг";
      }
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

    function clearError () {
      service.error = undefined;
    }




  }

}
)();
