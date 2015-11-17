'use strict';

angular.module('triviziApp')
    .directive('budget', function() {
        return {
            templateUrl: 'app/filters/budget/budget.html',
            restrict: 'EA',
            controller: function($scope, $timeout) {
                $scope.priceSlider = {
                    value: 125
                };

                $scope.$on("slideEnded", function() {
                    $scope.seekDeer();
                });

                $scope.$watch("priceSlider", function() {
                    //console.log($scope.priceSlider);
                });

                // $timeout(function() {
                //     $scope.$broadcast('reCalcViewDimensions');
                //     console.log('budget broadcast');
                // });

                // setTimeout(function() {
                //     $scope.$broadcast('reCalcViewDimensions');
                //     console.log('timedout for 2sec');
                // }, 2000)

            },
            link: function($scope, $timeout) {}
        };
    });