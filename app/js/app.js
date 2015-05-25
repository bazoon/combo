require("./authors/authors");
require("./books/books");
require("./selected_factory");

angular.module('myApp', [ 'page', 'logic.services', 'authors', 'books']);
