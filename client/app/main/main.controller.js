'use strict';
(function() {

    function MainController($scope, $http, socket, $filter, ean, yelp) {

        $scope.arriveDate = {
            defaultValue: new Date(),
            minDate: new Date() - 1,
            maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
            showweeks: false,
            mode: "month"
        }

        $scope.departDate = {
            defaultValue: new Date(),
            minDate: new Date() - 1,
            maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
            showweeks: false,
            mode: "month"
        };

        $scope.$watch("arriveDate.defaultValue", function() {
            $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
            //console.log("From: " + $scope.calendarArrive);
        });

        $scope.$watch("departDate.defaultValue", function() {
            $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
            //console.log("To: " + $scope.calendarDepart);
        });

        $scope.seekDeer = function() {
            $http.post('/api/things', {
                name: "$" + $scope.budgetAmount + " | " + $scope.calendarArrive + " - " + $scope.calendarDepart + " | " + $scope.specificLocation
            });
            $scope.newThing = '';
            //ean.eanRequest($scope);
            yelp.yelpRequest($scope);
        };

    }

    angular.module('triviziApp').controller('MainController', MainController);
})();


/*
 * angular directive for image source fallback
 * in case image size isnt provided
 */

angular.module('triviziApp').directive('fallbackSrc', function() {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});