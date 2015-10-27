'use strict';

angular.module('triviziApp')
    .directive('mapContainer', function() {
        return {
            templateUrl: 'app/mapContainer/mapContainer.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {}
        };
    });