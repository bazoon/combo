require("./authors/authors");
require("./books/books");
require("./selected_factory");
require("./page_controller");
require("./popular_authors_controller");
angular.module('myApp', [ 'page', 'logic.services', 'authors', 'books']);
