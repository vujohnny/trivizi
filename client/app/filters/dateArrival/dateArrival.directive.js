'use strict';

angular.module('triviziApp')
    .directive('dateArrival', function () {
        return {
            templateUrl: 'app/filters/dateArrival/dateArrival.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs, $filter) {
//                $scope.arriveDate = {
//                    defaultValue: new Date(),
//                    minDate: new Date() - 1,
//                    maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
//                    showweeks: false,
//                    mode: "month"
//                }
//
//                $scope.$watch("arriveDate.defaultValue", function () {
//                    $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
//                    $scope.seekDeer();
//                    $scope.departureDetails = true;
//                    //console.log("From: " + $scope.calendarArrive);
//                });
            }
        };
    });