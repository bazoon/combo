

angular.module('page', [])
	.controller('pageController', pageController);

pageController.$inject = ["$scope", 'selectedFactory'];

function pageController ($scope, selectedFactory) {
  var page = this;
  page.selected = selectedFactory;

  activate();

 ///////////

  function activate () {
    selectedFactory.activate();
  }

}
