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
                    $scope.$broadcast('reCalcViewDimensions');
                    console.log('budget broadcast');
                });

                $scope.reDraw = function() {
                    console.log('somethin');
                    $scope.$broadcast('reCalcViewDimensions');
                }

            },
            link: function ($scope, $timeout) {}
        };
    });