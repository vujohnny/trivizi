'use strict';
(function () {

    function MainController($scope, $http, socket, $filter, ean, yelp, eanYelp) {

        /*
            if mobile skip intro text
        */
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $scope.introText = false;
            $scope.fullText = true;
            $scope.hideMap = true;
        } else {
            $scope.introText = true;
            $scope.fullText = false;
            $scope.hideMap = false;
        }

        /*
            store database
        */
        $scope.storeSearchData = function () {
            $http.post('/api/things', {
                timeStamp: new Date(),
                budget: $scope.priceSlider.value,
                activeDate: $scope.calendarArrive,
                departDate: $scope.calendarDepart,
                category: $scope.category,
                headCount: $scope.numberOfAdults,
                specificLocation: $scope.specificLocation
            });
            $scope.newThing = '';
        }

        /*
            category search
        */
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

        /*
            ean search
        */
        $scope.seekDeer = function () {
            if (!$scope.specificLocation) {
                //console.log('location empty');
                $scope.closeAllFilters();

                if($scope.hideMap == false) {
                    //jquery
                    console.log('mobile 1');
                    $('google-map').hide();
                }

            } else {
                $scope.closeAllFilters();
                $scope.storeSearchData();
                ean.eanRequest($scope);

                if($scope.hideMap == true) {
                    //jquery
                    console.log('mobile 2');
                    $('google-map').hide();
                }
                
            }
        };

        $scope.clearResults = function () {
            $scope.resultsList = [];
        }

        $scope.closeAllFilters = function () {
            //console.log('close all');
            $scope.budgetIntroDetails = false;
            $scope.destinationIntroDetails = false;
            $scope.arrivalIntroDetails = false;
            $scope.departureIntroDetails = false;
            $scope.destinationDetails = false;
            $scope.budgetDetails = false;
            $scope.arrivalDetails = false;
            $scope.departureDetails = false;
            //$scope.adultDetails=false;  
            $scope.overlayMask = false;
        };

    }

    angular.module('triviziApp').controller('MainController', MainController);
})();