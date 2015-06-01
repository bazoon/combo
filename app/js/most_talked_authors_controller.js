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