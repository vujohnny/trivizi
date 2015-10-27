'use strict';
(function() {

    function MainController($scope, $http, socket, $filter, ean) {
        
        /// needs to be moved to arrival and departure directives
        
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
        
        $scope.arrivalChange = function() {
            $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
            $scope.seekDeer();
            $scope.departureDetails=true;
        }
        
        $scope.departureChange = function() {
            $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
            $scope.seekDeer();
        }
        
        ////////////////////////////////////////////////

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