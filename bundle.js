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

	__webpack_require__(6);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	module.exports = angular
	  .module('store.services', ['api.services']);



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	

	angular.module('authors', ['api.services'])
		.controller('authorsController', authorsController);

	authorsController.$inject = ["$scope", 'selectedFactory'];

		function authorsController ($scope, selectedFactory) {

			$scope.selected = selectedFactory;
			selectedFactory.activate();



	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';



	  module.exports = angular
	    .module('logic.services', [])
	    .factory('selectedFactory', selectedFactory);

	  selectedFactory.$inject = ['$q', 'authorsStore', 'booksStore'];


	  function selectedFactory ($q, authorsStore, booksStore) {


	    var service = {
	      activate: activate,
	      getAuthors: getAuthors,
	      authorChanged: authorChanged,
	      getCurrentBooks: getCurrentBooks,
	      randomSelect: randomSelect,
	      hint: hint
	    };

	    function activate () {
	      getAuthors().then(getCurrentBooks);
	    }

	    function getAuthors () {
	      return authorsStore.getAuthors().then(function (response) {
	        service.authors = response;
	        service.author = service.authors[0];
	        return service.authors;
	      });
	    }


	    function getCurrentBooks () {
	      return booksStore.getBooks(service.author.id).then(function (response) {
	        service.books = response;
	        return service.books;
	      });
	    }

	    function authorChanged () {
	      service.book = undefined;
	      getCurrentBooks();
	    }

	      function randomSelect () {
	        var randomAuthor = service.authors[Math.floor(Math.random() * service.authors.length)];
	        service.author = randomAuthor;
	        getCurrentBooks().then(function () {
	          service.book = service.books[Math.floor(Math.random() * service.books.length)];
	        });
	      }

	      function hint () {

	        if ((service.author === undefined) && (service.book === undefined)) {
	          return 'Выберите автора';
	        }

	        if ((service.author != undefined) && (service.book === undefined)) {
	          return 'Выберите книгу';
	        }

	        return service.author.name + ' написал "' + service.book.name + '"';

	    }


	    return service;

	  }

	}
	)();


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular
	  .module('api.services', []);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(1);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(4);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(3);
	angular.module('myApp', [ 'authors', 'api.services', 'store.services', 'logic.services']);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';
	  var routes = __webpack_require__(11);

	  module.exports = angular
	    .module('api.services')
	    .factory('authorsApiFactory', authorsApiFactory);

	  authorsApiFactory.$inject = ['apiFactory'];


	  function authorsApiFactory (apiFactory) {

	    var service = {
	      getAuthors: getAuthors
	    };

	    return service;

	    function getAuthors () {
	      return apiFactory.get(routes.authorsPath());
	    }

	  }

	}
	)();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  var routes = __webpack_require__(11);

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
/* 9 */
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
/* 10 */
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

	      var books = cache.get('books' + authorId);
	      if (books) {
	        var defer = $q.defer();
	        defer.resolve(books);
	        return defer.promise;
	      } else {
	        return booksApiFactory.getBooks(authorId).then(getBooksSuccess);
	      }

	      function getBooksSuccess (response) {
	        cache.put('books' + authorId, response.data);
	        return response.data;
	      }

	    }


	    return service;

	  }

	}
	)();


/***/ },
/* 11 */
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


/***/ }
/******/ ]);