'use strict';

angular.module('triviziApp')
    .directive('headcount', function () {
        return {
            templateUrl: 'app/filters/headcount/headcount.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs) {

                $scope.numberOfAdults = "2";
                $(".totalGuest").html($scope.numberOfAdults);
                
                $scope.adultCount = ["1", "2", "3", "4", "5", "6", "7", "8"];
                
                $scope.adultCountSet = function (adults) {
                    $scope.numberOfAdults = adults;
                    $(".totalGuest").html($scope.numberOfAdults);
                    $scope.seekDeer();
                }
            }
        };
    });