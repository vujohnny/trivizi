'use strict';

angular.module('triviziApp')
    .directive('navbar', function() {
        return {
            templateUrl: 'app/navbar/navbar.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {}
        };
    });