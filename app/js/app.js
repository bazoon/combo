require("./authors/authors");
require("./books/books");
require("./selected_factory");
require('./pageController');
require('./most_talked_authors_controller');
angular.module('myApp', [ 'page', 'api.services', 'logic.services']);
