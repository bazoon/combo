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

	__webpack_require__(7);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	angular.module('myApp', [ 'page', 'api.services', 'logic.services']);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  __webpack_require__(12);
	  var routes = __webpack_require__(11);


	  module.exports = angular
	    .module('authors')
	    .factory('authorsApiFactory', authorsApiFactory);

	  authorsApiFactory.$inject = ['apiFactory'];


	  function authorsApiFactory (apiFactory) {

	    var service = {
	      getAuthors: getAuthors
	    };

	    return service;

	    // //////////

	    function getAuthors () {
	      return apiFactory.get(routes.authorsPath());
	    }

	  }

	}
	)();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict';

	    __webpack_require__(6);

	    angular
	        .module('books', ['api.services']);


	    __webpack_require__(9);
	    __webpack_require__(10)
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict';

	    angular
	        .module('page')
	        .controller('mostTalkedAuthorsController', mostTalkedController);

	    mostTalkedController.$inject = ['$scope', 'selectedFactory', 'authorsStore'];

	    /* @ngInject */
	    function mostTalkedController($scope, selectedFactory, authorsStore) {
	        var vm = this;
	        vm.state = selectedFactory.getState()
	            
	        
	        vm.authorClicked = function (author) {
	            selectedFactory.setCurrentAuthor(author);
	        };

	        
	    }
	})();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular
	  .module('api.services', []);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict';

	    __webpack_require__(6);

	    angular
	        .module('authors', ['api.services']);


	    __webpack_require__(1);
	    __webpack_require__(8);
	})();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';


	  module.exports = angular
	    .module('authors')
	    .factory('authorsStore', authorsStore);

	  authorsStore.$inject = ['$q', 'authorsApiFactory', '$cacheFactory'];


	  function authorsStore ($q, authorsApiFactory, $cacheFactory) {

	    var cache = $cacheFactory('cache');

	    var service = {
	      getAuthors: getAuthors
	    };

	    return service;

	    // //////////

	    function getAuthors () {
	      var authors = cache.get('authors');

	      if (authors) {
	        return $q.when(authors);
	      } else {
	        return authorsApiFactory.getAuthors().then(getAuthorsSuccess);
	      }

	      function getAuthorsSuccess (response) {
	        cache.put('authors', response.data);
	        return response.data;
	      }

	    }

	  }

	}
	)();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  var routes = __webpack_require__(11);
	  __webpack_require__(12);

	  module.exports = angular
	    .module('books')
	    .factory('booksApiFactory', booksApiFactory);

	  booksApiFactory.$inject = ['$q', 'apiFactory'];


	  function booksApiFactory ($q, apiFactory) {

	    var service = {
	      getBooks: getBooks
	    };

	    return service;

	    // //////////

	    function getBooks (authorId) {
	      return apiFactory.get(routes.booksPath(authorId));
	    }

	  }

	}
	)();


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';


	  module.exports = angular
	    .module('books')
	    .factory('booksStore', booksStore);

	  booksStore.$inject = ['$q', 'booksApiFactory', '$cacheFactory'];


	  function booksStore ($q, booksApiFactory, $cacheFactory) {

	    var cache = $cacheFactory('mycache');

	    var service = {
	      getBooks: getBooks
	    };

	    return service;

	    // ////////////

	    function getBooks (authorId) {

	      var books = cache.get('books' + authorId);
	      if (books) {
	        return $q.when(books)
	      } else {
	        return booksApiFactory.getBooks(authorId).then(getBooksSuccess);
	      }

	      function getBooksSuccess (response) {
	        cache.put('books' + authorId, response.data);
	        return response.data;
	      }

	    }




	  }

	}
	)();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  var config = __webpack_require__(13);

	  module.exports = {
	    authorsPath: authorsPath,
	    booksPath: booksPath
	   };

	   // /////////

	  function authorsPath () {
	    return apiPoint("authors");
	  }

	  function booksPath (authorId) {
	    return apiPoint("books", authorId);
	  }

	  function apiPoint () {
	    var args = Array.prototype.slice.call(arguments);
	    return config.apiServer + args.join("/");
	  }


	})();


/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';

	  module.exports = {
	    apiServer: "http://demo4758158.mockable.io/"
	  };


	})();


/***/ }
/******/ ]);