'use strict';

angular.module('triviziApp')
    .directive('budget', function () {
        return {
            templateUrl: 'app/filters/budget/budget.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs) {
                $scope.priceSlider = 125;
                $scope.$on("slideEnded", function () {
                    $scope.seekDeer();
                });
                $scope.$watch("priceSlider", function (newValue, oldValue) {
                    //console.log($scope.priceSlider);
                    $scope.priceSliderOld=oldValue;
                });
            }
        };
    });