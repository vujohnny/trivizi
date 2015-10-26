'use strict';

angular.module('triviziApp')
    .directive('budget', function() {
        return {
            templateUrl: 'app/filters/budget/budget.html',
            restrict: 'EA',
            link: function($scope, $element, $attrs) {
                $scope.priceSlider = 50;
                // $scope.$on("slideEnded", function() {
                // 	console.log($scope.priceSlider); 
                // });
            }
        };
    });