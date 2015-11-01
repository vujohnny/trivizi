'use strict';
angular.module('triviziApp')
    .directive('destination', function() {
        return {
            templateUrl: 'app/filters/destination/destination.html',
            restrict: 'EA',
            controller: function($scope, $element, $attrs, ean, yelp) {
                $scope.typesOfPlaces = ['romantic', 'tropical', 'party', 'family', 'pet friendly'];

                $scope.catRomantic = [{
                    city: 'Cabo San Lucas',
                    lat: 22.8963133,
                    lng: -109.9680176
                }, {
                    city: 'San Diego, CA',
                    lat: 32.8248175,
                    lng: -117.3753462
                }, {
                    city: 'San Francisco, CA',
                    lat: 37.757815,
                    lng: -122.5076397
                }, {
                    city: 'New York, NY',
                    lat: 40.7034947,
                    lng: -74.259861
                }, {
                    city: 'Cancún, Mexico',
                    lat: 21.1215908,
                    lng: -86.9194802
                }];

                $scope.yelpHold = function(category) {

                    $scope.deleteMarkers();
                    $scope.category = category;
                    
                    angular.forEach($scope.catRomantic, function(k, v) {
                        $scope.buildCatReturn(k.city, k.lat, k.lng);
                    });

                }

                $scope.emptyPlace = function() {
                    $('.placeHolderLocation').remove();
                }
            },
            link: function($scope, $element, $attrs) {}
        };
    });