'use strict';

angular.module('triviziApp')
    .directive('dateArrival', function () {
        return {
            templateUrl: 'app/filters/dateArrival/dateArrival.html',
            restrict: 'EA',
            controller: function ($scope, $element, $attrs, $filter) {
                
                $scope.arriveDate = {
                    defaultValue: new Date(),
                    minDate: new Date() - 1,
                    maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
                    showweeks: false,
                    mode: "month"
                }

                $scope.arrivalChange = function () {
                    $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
                    $scope.seekDeer();
                    //$scope.departureDetails = true;
                }
                
                $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
            },
            link: function ($scope, $element, $attrs, $filter) {}
        };
    });