'use strict';

angular.module('triviziApp')
    .directive('dateDeparture', function () {
        return {
            templateUrl: 'app/filters/dateDeparture/dateDeparture.html',
            restrict: 'EA',
            controller: function ($scope, $element, $attrs, $filter) {

                var defaultDate = new Date();
                var defaultDateDaysToAdd = 2;

                $scope.departDate = {
                    defaultValue: defaultDate.setDate(defaultDate.getDate() + defaultDateDaysToAdd),
                    minDate: new Date() - 1,
                    maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
                    showweeks: false,
                    mode: "month"
                };

                $scope.departureChange = function () {
                    $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
                    //$scope.seekDeer();
                }
                
            },
            link: function ($scope, $element, $attrs, $filter) {}
        };
    });