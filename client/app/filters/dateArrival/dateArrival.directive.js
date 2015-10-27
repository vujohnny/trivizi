'use strict';

angular.module('triviziApp')
    .directive('dateArrival', function() {
        return {
            templateUrl: 'app/filters/dateArrival/dateArrival.html',
            restrict: 'EA',
            link: function($scope, $element, $attrs) {}
        };
    });