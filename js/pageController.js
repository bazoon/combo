

angular.module('page',[])
	.controller('pageController', pageController);

pageController.$inject = ["$scope", 'selectedFactory'];

	function pageController ($scope, selectedFactory) {
		$scope.selected = selectedFactory;
		selectedFactory.activate();
}
