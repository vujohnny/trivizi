'use strict';
(function() {

    function MainController($scope, $http, socket, $filter, ean, yelp) {

        $scope.seekDeer = function() {
            $http.post('/api/things', {
                name: "$" + $scope.budgetAmount + " | " + $scope.calendarArrive + " - " + $scope.calendarDepart + " | " + $scope.specificLocation
            });
            $scope.newThing = '';
            ean.eanRequest($scope);
            //yelp.yelpRequest($scope);
        };
        
        $scope.closeAllFilters = function() {
            $scope.destinationDetails = false;
            $scope.budgetDetails=false; 
            $scope.arrivalDetails=false; 
            $scope.departureDetails=false; 
            //$scope.adultDetails=false;  
        };

    }

    angular.module('triviziApp').controller('MainController', MainController);
})();
