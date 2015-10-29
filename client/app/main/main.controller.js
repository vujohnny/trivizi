'use strict';
(function() {

    function MainController($scope, $http, socket, ean) {

        $scope.seekDeer = function() {
            $http.post('/api/things', {
                name: "$" + $scope.budgetAmount + " | " + $scope.calendarArrive + " - " + $scope.calendarDepart + " | " + $scope.specificLocation
            });
            $scope.newThing = '';
            ean.eanRequest($scope);
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