'use strict';

angular.module('triviziApp')
    .directive('dateDeparture', function () {
        return {
            templateUrl: 'app/filters/dateDeparture/dateDeparture.html',
            restrict: 'EA',
            controller: function ($scope, $element, $attrs, $filter) {
                $scope.departDate = {
                    defaultValue: new Date(),
                    minDate: new Date() - 1,
                    maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
                    showweeks: false,
                    mode: "month"
                };

                $scope.departureChange = function () {
                    $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
                    $scope.seekDeer();
                }
            },
            link: function ($scope, $element, $attrs, $filter) {}
        };
    });