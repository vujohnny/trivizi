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
        $scope.searchCategory = function () {
            if ($scope.category) {
                $scope.storeSearchData();
                /*
                $scope.searchCategory = yelp.yelpRequest($scope, function (data) {
                    if (data.length > 0) {
                        //$scope.panMap(data[0].id, data[0].markerId);
                    }
                });
                */

                yelp.yelpRequest($scope, function (data) {
                    eanYelp.eanYelpRequest($scope, data);
                });
            }
        }

        //EAN Search
        $scope.seekDeer = function () {
            $scope.$watch('specificLocation', function (newValue, oldValue) {
                if ($scope.resultsList && newValue == oldValue) {
                    //If the resultList is there we shouldn't have to research or call the API again if it's just a price change unless it's a location change.
                    console.log('being watched oldValue:', oldValue, 'newValue:', newValue);
                } else if ($scope.specificLocation) {
                    $scope.closeAllFilters();
                    $scope.storeSearchData();
                    ean.eanRequest($scope);
                }
            }, true);


        };

        $scope.closeAllFilters = function () {
            $scope.destinationDetails = false;
            $scope.budgetDetails = false;
            $scope.arrivalDetails = false;
            $scope.departureDetails = false;
            //$scope.adultDetails=false;  
        };

    }

    angular.module('triviziApp').controller('MainController', MainController);
})();