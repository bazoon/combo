require("./api/api_services_module");
require("./store/store_services_module");
require("./api/authors_api_factory");
require("./api/books_api_factory");
require("./api/api_factory");
require("./store/authors_store_factory");
require("./store/books_store_factory");
require("./selected_factory");
angular.module('myApp', [ 'page', 'api.services', 'store.services', 'logic.services']);
