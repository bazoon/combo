angular.module('authors',[])
.controller('authorsController', function($scope){

  	$scope.authors = [
				  		{ name: 'Пушкин',
				  		  books: ['Сказка о царе Салтане', 'Сказка о рыбаке и рыбке', 'Скупой рыцарь']
				  		},	

				  		{
				  			name: 'Гоголь',
				  			books: ['Вий','Вечера на хуторе близ Диканьки']
				  		},

				  		{
				  			name: 'Толстой',
				  			books: ['Война и Мир','Воскресенье','Анна Каренина']
				  		},

				  		{
				  			name: 'Пришвин',
				  			books: ['Кладовая солнца', 'Выскочка']
				  		}
  	];

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

});
