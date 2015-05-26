

angular.module('page', [])
	.controller('pageController', pageController);

pageController.$inject = ["$scope", 'selectedFactory', 'authorsStore'];

function pageController ($scope, selectedFactory, authorsStore) {
  var page = this;
  page.hint = selectedFactory.hint;
  
  activate();

 ///////////

  function activate () {
    getAuthors();
  }

  function getAuthors () {
    return authorsStore.getAuthors().then(getAuthorsSuccess, getAuthorsFailed);

    function getAuthorsSuccess (response) {
      page.authors = response;
      if (page.authors instanceof Array) {
        page.author = page.authors[0];
        selectedFactory.setAuthors(page.authors);
        selectedFactory.setCurrentAuthor(page.author);  
        loadBooks();
      }
    }

    function getAuthorsFailed () {
      page.error = "Ошибка загрузки авторов";
    }

  }

  function loadBooks () {
    selectedFactory.getCurrentBooks().then(function (books) {
      page.books = books
      clearError();
    });  
  }

  page.authorChanged = function () {
    page.book = undefined;
    loadBooks();
  }

  page.bookChanged = function () {
    selectedFactory.setCurrentBook(page.book);  
  }

  page.randomSelect = function () {
    selectedFactory.randomSelect().then(function (response) {
      page.author = response.author;
      page.books = response.books;
      page.book = response.book;
    })
  }

  function clearError () {
    page.error = undefined;
  }




}
