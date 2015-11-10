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
            if ($scope.resultsList.length > 0 && $scope.priceSlider < $scope.priceSliderOld) {
                //If the resultList is there we shouldn't have to research or call the API again if it's just a price change unless it's a location change.
                $scope.deleteMarkers();
                $scope.resultsList = $scope.resultsList
                    .filter(function (el) {
                        return el.roundedAverage <= $scope.priceSlider;
                    });
                $.each($scope.resultsList, function (k,v) {
                    $scope.markersDisplay(v.lat, v.lng);
                });
                $scope.panMap($scope.resultsList[0].id, $scope.resultsList[0].markerId);

            } else if ($scope.specificLocation) {
                $scope.closeAllFilters();
                $scope.storeSearchData();
                ean.eanRequest($scope);
            }
        };

        $scope.clearResults = function () {
            $scope.resultsList = [];
        }

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