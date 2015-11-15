'use strict';

angular.module('triviziApp')
    .directive('budget', function () {
        return {
            templateUrl: 'app/filters/budget/budget.html',
            restrict: 'EA',
            controller: function ($scope, $timeout) {
                $scope.priceSlider = {
                    value: 125
                };

                $scope.$on("slideEnded", function () {
                    $scope.seekDeer();
                });

                $scope.$watch("priceSlider", function () {
                    //console.log($scope.priceSlider);
                });

                $timeout(function () { 
                    console.log('edgar');
                    $scope.$broadcast('reCalcViewDimensions');
                }

            },
            link: function ($scope, $timeout) {}
        };
    });