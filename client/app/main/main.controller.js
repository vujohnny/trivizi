'use strict';
(function () {

    function MainController($scope, $http, socket, $filter, ean, yelp, eanYelp) {

        $scope.storeSearchData = function () {
            $http.post('/api/things', {
                name: "$" + $scope.budgetAmount + " | " + $scope.calendarArrive + " - " + $scope.calendarDepart + " | " + $scope.specificLocation
            });
            $scope.newThing = '';
        }

        //category search
        $scope.searchCategory = function (category) {
            $scope.storeSearchData();
            $scope.category = category;

            $scope.searchCategory = yelp.yelpRequest($scope, function (data) {
                if (data.length > 0) {
                    //$scope.panMap(data[0].id, data[0].markerId);
                }
            });
        }

        //EAN Search
        $scope.seekDeer = function () {
                        
            if (!$scope.specificLocation) {
                console.log('location empty');
            } else {
                $scope.closeAllFilters();
                $scope.storeSearchData();
                ean.eanRequest($scope);
            }

        };

        $scope.closeAllFilters = function () {
            console.log('close all');
            
            $scope.budgetIntroDetails=false; 
            $scope.destinationIntroDetails=false; 
            $scope.arrivalIntroDetails=false; 
            $scope.departureIntroDetails=false; 
            
            $scope.destinationDetails = false;
            $scope.budgetDetails = false;
            $scope.arrivalDetails = false;
            $scope.departureDetails = false;
            ;
            
            //$scope.adultDetails=false;  
            $scope.overlayMask = false
            
            
        };

    }

    angular.module('triviziApp').controller('MainController', MainController);
})();