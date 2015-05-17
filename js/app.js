require("./api/api_services");
require("./store/store_services");
require("./api/authors_api");
require("./api/books_api");
require("./api/api");
require("./store/authors_store");
require("./store/books_store");
require("./selected");
angular.module('myApp', [ 'authors', 'api.services', 'store.services', 'logic.services']);
