'use strict';

angular.module('triviziApp')
    .directive('headcount', function() {
        return {
            templateUrl: 'app/filters/headcount/headcount.html',
            restrict: 'EA',
            link: function($scope, $element, $attrs) {
                $scope.numberOfAdults = {
                    "type": "select",
                    "name": "totalAdults",
                    "value": "2",
                    "values": ["1", "2", "3", "4", "5", "6", "7", "8"]
                };
            }
        };
    });