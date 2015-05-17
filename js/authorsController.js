

angular.module('authors', ['api.services'])
	.controller('authorsController', authorsController);

authorsController.$inject = ["$scope", 'selectedFactory'];

	function authorsController ($scope, selectedFactory) {

		$scope.selected = selectedFactory;
		selectedFactory.activate();



}
