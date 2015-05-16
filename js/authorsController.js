

angular.module('authors', ['api.services'])
	.controller('authorsController', authorsController);

authorsController.$inject  = ["$scope", 'selectedFactory'];

	function authorsController ($scope, selectedFactory) {

			

			
		selectedFactory.getAuthors().then(function  (response) {
			$scope.authors = response;
			
			var s =selectedFactory.getCurrentBooks().then(function (response) {
				$scope.books = response;
			});

			$scope.currentAuthor = selectedFactory.getCurrentAuthor();

		})


		// booksStore.getBooks(1).then(function  (response) {
			
		// })

	  	
	  	$scope.authorChanged = function() {
	  		$scope.book = undefined;
	  	};

		$scope.randomSelect = function() {
			var randomAuthor = $scope.authors[Math.floor(Math.random() * $scope.authors.length)];
			$scope.currentAuthor = randomAuthor;
			$scope.book = randomAuthor.books[Math.floor(Math.random() * randomAuthor.books.length)];
		};

		$scope.hint = function() {
			if (($scope.currentAuthor === undefined) && ($scope.book === undefined)) {
				return 'Выберите автора';
			}

			if (($scope.currentAuthor != undefined) && ($scope.book === undefined)) {
				return 'Выберите книгу';
			}
			
			return $scope.currentAuthor.name + ' написал ' + $scope.book;
			

	}

}
