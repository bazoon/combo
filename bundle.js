/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4)
	__webpack_require__(5);
	__webpack_require__(10)
	__webpack_require__(2);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(11)
	angular.module('myApp', [ 'authors', 'api.services', 'store.services', 'logic.services']);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  
	  module.exports = angular
	    .module('api.services')
	    .factory('apiFactory', apiFactory);

	  apiFactory.$inject = ['$q', '$http'];

	  function apiFactory ($q, $http) {

	    var service = {
	      get: get
	    };

	    return service;

	    function get (apiPath) {
	      return $http.get(apiPath);
	    }

	  }

	})();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular
	  .module('api.services', []);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = angular
	  .module('store.services', ['api.services']);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  var routes = __webpack_require__(6);
	  
	  module.exports = angular
	    .module('api.services')
	    .factory('authorsApiFactory', authorsApiFactory);

	  authorsApiFactory.$inject = ['$q', 'apiFactory'];

	  
	  function authorsApiFactory ($q, apiFactory) {

	    var service = {
	      getAuthors: getAuthors
	    };

	    return service;

	    function getAuthors (argument) {
	      return apiFactory.get(routes.authorsPath());
	    }

	  }

	}
	)();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  module.exports = {

	    authorsPath: function () {
	      return "http://demo4758158.mockable.io/authors";
	    },

	    booksPath: function (authorId) {
	      return "http://demo4758158.mockable.io/books/" + authorId;
	    }


	   };
	})();


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  
	  
	  module.exports = angular
	    .module('store.services')
	    .factory('authorsStore', authorsStore);

	  authorsStore.$inject = ['$q', 'authorsApiFactory', '$cacheFactory'];

	  
	  function authorsStore ($q, authorsApiFactory, $cacheFactory) {

	    var cache = $cacheFactory('cache');

	    var service = {
	      getAuthors: getAuthors
	    };

	    function getAuthors () {
	      var deferred = $q.defer();
	      var authors = cache.get('authors');
	      
	      if (authors) {
	        return deferred.resolve(authors).promise;  
	      } else {
	        return authorsApiFactory.getAuthors().then(getAuthorsSuccess);
	      }

	      function getAuthorsSuccess (response) {
	        cache.put('authors', response.data);
	        return response.data;
	      }

	    }





	    return service;

	  }

	}
	)();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  
	  
	  module.exports = angular
	    .module('store.services')
	    .factory('booksStore', booksStore);

	  booksStore.$inject = ['$q', 'booksApiFactory', '$cacheFactory'];

	  
	  function booksStore ($q, booksApiFactory, $cacheFactory) {

	    var cache = $cacheFactory('mycache');

	    var service = {
	      getBooks: getBooks
	    };

	    function getBooks (authorId) {
	      var deferred = $q.defer();
	      var books = cache.get('books' + authorId);
	      
	      if (books) {
	        return deferred.resolve(books).promise;  
	      } else {
	        return booksApiFactory.getBooks(authorId).then(getBooksSuccess);
	      }

	      function getBooksSuccess (response) {
	        cache.put('books', response.data);
	        console.log('getBooksSuccess', response.data);
	        return response.data;
	      }

	    }



	    return service;

	  }

	}
	)();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  var routes = __webpack_require__(6);
	  
	  module.exports = angular
	    .module('api.services')
	    .factory('booksApiFactory', booksApiFactory);

	  booksApiFactory.$inject = ['$q', 'apiFactory'];

	  
	  function booksApiFactory ($q, apiFactory) {

	    var service = {
	      getBooks: getBooks
	    };

	    return service;

	    function getBooks (authorId) {
	      return apiFactory.get(routes.booksPath(authorId));
	    }

	  }

	}
	)();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  
	  
	  module.exports = angular
	    .module('logic.services', [])
	    .factory('selectedFactory', selectedFactory);

	  selectedFactory.$inject = ['$q', 'authorsStore', 'booksStore'];

	  
	  function selectedFactory ($q, authorsStore, booksStore) {

	    var _currentAuthor = null;
	    var _authors = null;
	    var _books = null;

	    var service = {
	      activate: activate,
	      getAuthors: getAuthors,
	      setCurrentAuthor: setCurrentAuthor,
	      getCurrentAuthor: getCurrentAuthor,
	      getCurrentBooks: getCurrentBooks
	    };

	    function activate () {
	      console.log('activate');
	    }

	    function getAuthors () {
	      return authorsStore.getAuthors().then(function  (response) {
	        _authors = response;
	        setCurrentAuthor(_authors[0]);
	        return _authors;
	      });
	    }
	    
	    function setCurrentAuthor (author) {
	       _currentAuthor = author; 
	    }

	    function getCurrentAuthor () {
	      return _currentAuthor;
	    }

	    function getCurrentBooks () {
	      
	      return booksStore.getBooks(1).then(function  (response) {
	        _books = response;
	        return _books;
	      });


	    }

	    return service;

	  }

	}
	)();


/***/ }
/******/ ]);