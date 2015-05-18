require("./api/api_services_module");
require("./store/store_services_module");
require("./selected_factory");

angular.module('myApp', [ 'page', 'api.services', 'store.services', 'logic.services']);
