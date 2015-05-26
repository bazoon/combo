(function() {
  'use strict';

  

  module.exports = angular
    .module('logic.services', ['authors', 'books'])
    .factory('selectedFactory', selectedFactory);

  selectedFactory.$inject = ['$q', 'authorsStore', 'booksStore'];


  function selectedFactory ($q, authorsStore, booksStore) {

    var state = {};

    var service = {
      setAuthors: setAuthors,
      setCurrentAuthor: setCurrentAuthor,
      setCurrentBook: setCurrentBook,
      getCurrentBooks: getCurrentBooks,
      randomSelect: randomSelect,
      hint: hint
    };

    return service;


    // /////////////
    function setAuthors (authors) {
      state.authors = authors;
    }

    function setCurrentAuthor (author) {
      state.author = author;
    }

    function setCurrentBook (book) {
      state.book = book;
    }

    
    function getCurrentBooks () {
      return booksStore.getBooks(state.author.id).then(getBooksSuccess, getBooksFailed);

      function getBooksSuccess (response) {
        state.books = response;
        return state.books;
      }

      function getBooksFailed () {
        service.error = "Ошибка загрузки книг";
      }
    }

    function authorChanged () {
      state.book = undefined;
      getCurrentBooks();
    }

    function randomSelect () {
      var randomAuthor = state.authors[Math.floor(Math.random() * state.authors.length)];
      state.author = randomAuthor;

      return getCurrentBooks().then(function () {
        state.book = state.books[Math.floor(Math.random() * state.books.length)];
        return { author: state.author, books: state.books, book: state.book };
      });

    }

    function hint () {

      if ((state.author === undefined) && (state.book === undefined)) {
        return 'Выберите автора';
      }

      if ((state.author != undefined) && (state.book === undefined)) {
        return 'Выберите книгу';
      }

      return state.author.name + ' написал "' + state.book.name + '"';

    }



  }

}
)();
