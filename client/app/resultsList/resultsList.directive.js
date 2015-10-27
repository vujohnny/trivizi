'use strict';

angular.module('triviziApp')
    .directive('resultsList', function() {
        return {
            templateUrl: 'app/resultsList/resultsList.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {}
        };
    });