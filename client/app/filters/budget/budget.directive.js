'use strict';

angular.module('triviziApp')
    .directive('budget', function () {
        return {
            templateUrl: 'app/filters/budget/budget.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs) {
                $scope.priceSlider = 125;
                $scope.$on("slideEnded", function () {
                    if ($scope.category) {
                        $scope.searchCategory();
                    } else {
                        $scope.seekDeer();
                    }

                });
                $scope.$watch("priceSlider", function () {
                    //console.log($scope.priceSlider);
                });
            }
        };
    });