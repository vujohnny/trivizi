'use strict';
angular.module('triviziApp')
    .directive('destination', function() {
        return {
            templateUrl: 'app/filters/destination/destination.html',
            restrict: 'EA',
            controller: function($scope, $element, $attrs, ean, yelp) {
                $scope.typesOfPlaces = ['romantic', 'tropical', 'party', 'family', 'pet friendly'];

                $scope.catRomantic = [{
                    city: 'Venice, Italy',
                    lat: 45.4536617,
                    lng: 11.9707408
                }, {
                    city: 'Paris, France',
                    lat: 48.8588377,
                    lng: 2.2775172
                }, {
                    city: 'Prague, Czech Republic',
                    lat: 50.0595854,
                    lng: 14.3255409
                }, {
                    city: 'Lisbon, Portugal',
                    lat: 38.7436057,
                    lng: -9.2302438
                }, {
                    city: 'Napa Valley, CA, USA',
                    lat: 38.4294863,
                    lng: -122.7010186
                }, {
                    city: 'Kahului, HI, USA',
                    lat: 20.87505,
                    lng: -156.4914596
                }, {
                    city: 'Buenos Aires, Argentina',
                    lat: -34.6158037,
                    lng: -58.5033605
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