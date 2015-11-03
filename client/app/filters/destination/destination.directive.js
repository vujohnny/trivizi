'use strict';
angular.module('triviziApp')
    .directive('destination', function() {
        return {
            templateUrl: 'app/filters/destination/destination.html',
            restrict: 'EA',
            controller: function($scope, $element, $attrs, ean, yelp) {
                $scope.typesOfPlaces = ['romantic', 'party', 'family', 'pet friendly', 'tropical'];

                var romanticList = [{
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
                
                var partyList = [{
                    city: 'Cabo San Lucas',
                    lat: 22.8963133,
                    lng: -109.9680176
                }, {
                    city: 'San Diego, CA',
                    lat: 32.8248175,
                    lng: -117.3753462
                }, {
                    city: 'New York, NY',
                    lat: 40.7034947,
                    lng: -74.259861
                }, {
                    city: 'Cancún, Mexico',
                    lat: 21.1215908,
                    lng: -86.9194802
                }, {
                    city: 'Las Vegas, NV',
                    lat: 36.1249185,
                    lng: -115.315085
                }, {
                    city: 'New Orleans, LA',
                    lat: 30.0218762,
                    lng: -90.0231687
                }, {
                    city: 'Amsterdam, Netherlands',
                    lat: 52.3746329,
                    lng: 4.7585316
                }];

                $scope.yelpHold = function(category) {
                    
                    $scope.deleteMarkers();
                    $scope.category = category;
                    var currentCategoryList = eval(category+"List");
                    
                    angular.forEach(currentCategoryList, function(k, v) {
                        $scope.buildCatReturn(k.city, k.lat, k.lng);
                    });

                }

                $scope.changeText = function(category) {
                    $('.placeHolderLocation').remove();
                    $('.cityPlaceHolder').hide();
                    $('.switchSomewhere').empty().html('somewhere');
                    $('.categoryPlaceHolder').show().empty().append($scope.category);
                    $scope.destinationIntroDetails = false;
                }
                $scope.emptyPlace = function() {
                    $('.placeHolderLocation').remove();
                }
            },
            link: function($scope, $element, $attrs) {}
        };
    });