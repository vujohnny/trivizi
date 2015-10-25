'use strict';

angular.module('triviziApp')
    .directive('filterNav', function () {
        return {
            templateUrl: 'app/filterNav/filterNav.html',
            restrict: 'EA'
        };
    });