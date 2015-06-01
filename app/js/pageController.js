

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

    function getAuthorsSuccess (authors) {
      if (authors instanceof Array) {
        selectedFactory.setAuthors(authors);
        selectedFactory.setCurrentAuthor(authors[0]);  
        page.state = selectedFactory.getState();
      }
    }

    function getAuthorsFailed () {
      page.error = "Ошибка загрузки авторов";
    }

  }

  page.randomSelect = function () {
    selectedFactory.randomSelect();
  }

  function clearError () {
    page.error = undefined;
  }




}
