(function() {
  'use strict';

  

  module.exports = angular
    .module('logic.services', ['authors', 'books'])
    .factory('selectedFactory', selectedFactory);

  selectedFactory.$inject = ['$q', 'authorsStore', 'booksStore'];


  function selectedFactory ($q, authorsStore, booksStore) {

    var state = {
      set author (currentAuthor) {
        this._author = currentAuthor;
        getCurrentBooks();
      },

      get author () {
        return this._author;
      }


    };


    var service = {
      setAuthors: setAuthors,
      getAuthors: getAuthors,

      setCurrentAuthor: setCurrentAuthor,
      getCurrentAuthor: getCurrentAuthor,
      
      setCurrentBook: setCurrentBook,
      getCurrentBooks: getCurrentBooks,
      
      getState: getState,
      
      randomSelect: randomSelect,
      hint: hint
    };

    return service;


    // /////////////
    function getState () {
      return state;
    }

    function setAuthors (authors) {
      state.authors = authors;
    }

    function getAuthors () {
      return $q.when(state.authors);
    }

    function setCurrentAuthor (author) {
      state.author = author;
      getCurrentBooks();
    }

    function getCurrentAuthor () {
      return state.author;
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
